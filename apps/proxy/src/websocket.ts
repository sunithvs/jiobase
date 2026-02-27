import type { ProxyConfig } from './types.js';

export async function handleWebSocket(
  request: Request,
  config: ProxyConfig
): Promise<Response> {
  const url = new URL(request.url);
  const upstreamUrl = new URL(config.supabaseUrl);
  upstreamUrl.pathname = url.pathname;
  upstreamUrl.search = url.search;

  // Build upstream WebSocket URL
  const wsUrl = upstreamUrl.toString().replace('https:', 'wss:').replace('http:', 'ws:');

  // Create upstream WebSocket connection
  const upstreamResp = await fetch(wsUrl, {
    headers: request.headers,
  });

  const upstreamWs = upstreamResp.webSocket;
  if (!upstreamWs) {
    return new Response('Failed to establish upstream WebSocket', { status: 502 });
  }
  upstreamWs.accept();

  // Create client WebSocket pair
  const [client, server] = Object.values(new WebSocketPair());
  server.accept();

  // Relay messages bidirectionally
  upstreamWs.addEventListener('message', (event) => {
    try {
      server.send(event.data);
    } catch {
      // Client disconnected
    }
  });

  server.addEventListener('message', (event) => {
    try {
      upstreamWs.send(event.data);
    } catch {
      // Upstream disconnected
    }
  });

  // Handle close events
  upstreamWs.addEventListener('close', (event) => {
    try {
      server.close(event.code, event.reason);
    } catch {}
  });

  server.addEventListener('close', (event) => {
    try {
      upstreamWs.close(event.code, event.reason);
    } catch {}
  });

  // Handle errors
  upstreamWs.addEventListener('error', () => {
    try { server.close(1011, 'Upstream error'); } catch {}
  });

  server.addEventListener('error', () => {
    try { upstreamWs.close(1011, 'Client error'); } catch {}
  });

  return new Response(null, { status: 101, webSocket: client });
}
