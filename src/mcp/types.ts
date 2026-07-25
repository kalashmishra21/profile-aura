export interface McpToolSchema {
  type: string;
  properties?: Record<string, any>;
  required?: string[];
}

export interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: McpToolSchema;
  outputSchema?: McpToolSchema;
  execute: (params: any) => Promise<McpToolExecutionResult>;
}

export interface McpToolExecutionResult {
  success: boolean;
  data?: any;
  error?: string;
  logs?: string[];
}
