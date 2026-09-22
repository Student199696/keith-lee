declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    RESEND_API_KEY?: string;
    PARTNERSHIP_FROM_EMAIL?: string;
    PARTNERSHIP_TO_EMAIL?: string;
  }
}
