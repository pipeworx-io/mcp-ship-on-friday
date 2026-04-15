# mcp-ship-on-friday

ship-on-friday MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `ship_on_friday_check` | Check whether you should ship on Friday. The answer is always no. Returns a rotating reason, risk level (always catastrophic), suggested day, and on-call sympathy score. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "ship-on-friday": {
      "url": "https://gateway.pipeworx.io/ship-on-friday/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use ship-on-friday
```

## License

MIT
