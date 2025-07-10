export interface MyMessage
{
  id: number
  subject: string,
  message: string
  sentAt: Date
  reply: string
  replyedAt: Date,
  isReadByAdmin: boolean
}
