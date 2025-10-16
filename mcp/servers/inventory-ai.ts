// MCP server configuration for inventory AI assistant
export const inventoryAIServer = {
  name: 'inventory-ai',
  command: 'uvx',
  args: ['inventory-ai-mcp-server@latest'],
  env: {
    FASTMCP_LOG_LEVEL: 'ERROR',
    INVENTORY_API_KEY: process.env.MCP_API_KEY,
  },
  disabled: false,
  autoApprove: [],
}
