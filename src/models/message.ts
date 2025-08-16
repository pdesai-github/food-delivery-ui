export interface SqsMessage {
    messageId: string;
    body: string;
    receiptHandle: string;
}
