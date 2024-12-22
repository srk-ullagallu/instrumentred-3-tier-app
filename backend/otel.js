const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { MySQLInstrumentation } = require('@opentelemetry/instrumentation-mysql2'); // Ensure correct import

// Enable verbose diagnostics for debugging
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

// Initialize Prometheus Exporter
const prometheusExporter = new PrometheusExporter({
  startServer: true,
  port: 9464,
}, () => {
  console.log('✅ Prometheus metrics exposed at http://localhost:9464/metrics');
});

// Initialize OpenTelemetry SDK
const sdk = new NodeSDK({
  traceExporter: prometheusExporter,
  instrumentations: [
    getNodeAutoInstrumentations(), // Auto-discover supported libraries
    new MySQLInstrumentation() // Explicitly add MySQL instrumentation if required
  ],
});

// Start OpenTelemetry
sdk.start()
  .then(() => console.log('✅ OpenTelemetry initialized successfully'))
  .catch((error) => console.error('❌ Error initializing OpenTelemetry:', error));

// Graceful shutdown
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('✅ Tracing terminated'))
    .catch((error) => console.error('❌ Error shutting down tracing:', error))
    .finally(() => process.exit(0));
});