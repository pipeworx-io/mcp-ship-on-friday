interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * ship-on-friday MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Check whether you should ship on Friday. The answer is always no. Returns a rota
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'ship_on_friday_check',
    description: 'Check whether you should ship on Friday. The answer is always no. Returns a rotating reason, risk level (always catastrophic), suggested day, and on-call sympathy score.',
    inputSchema: {
      type: 'object' as const,
      properties: {"deploy_type": {"type": "string", "description": "Type of deploy: hotfix, feature, or refactor", "enum": ["hotfix", "feature", "refactor"]}, "team_size": {"type": "number", "description": "Size of your team"}, "is_friday": {"type": "boolean", "description": "Override Friday detection (auto-detected by default)"}},
      required: [],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('ship-on-friday API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'ship_on_friday_check':
      return callApi('https://api.stupidapis.com/ship-on-friday/check', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
