export const SYSTEM_EVENTS = {
  CONFIG_LOADED: 'system:config:loaded',
  DATA_FETCHED: 'system:data:fetched',
  BEFORE_RENDER: 'system:render:before',
  AFTER_RENDER: 'system:render:after',
  PIPELINE_COMPLETE: 'system:pipeline:complete',
  ERROR_OCCURRED: 'system:error'
} as const;
