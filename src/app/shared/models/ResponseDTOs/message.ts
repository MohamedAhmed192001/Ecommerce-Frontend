export interface Message {
  id: number
  subject: string,
  message: string,
  senderName: string,
  senderEmail: string,
  sentAt: Date
  reply: string
  replyedAt: Date,
  isReadByCustomer: boolean
}
