export type OrderResult =
    | {
          success: false;
          error: string;
      }
    | {
          success: true;
          clientSecret: string | null;
          requiresPayment: true;
      }
    | {
          success: true;
          orderId: string;
          message: string;
      };
