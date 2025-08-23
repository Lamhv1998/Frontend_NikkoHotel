import type { SendOtpRequest, VerifyOtpRequest } from '@/types/auth'

export default {
  // Send OTP
  sendOtpApi: (options: { body: SendOtpRequest }) => {
    return useHttp().post('/notifications/send-otp', options.body)
  },
  
  // Verify OTP
  verifyOtpApi: (options: { body: VerifyOtpRequest }) => {
    return useHttp().post('/notifications/verify-otp', options.body)
  },
  
  // Send notification
  sendNotificationApi: (options: { body: any }) => {
    return useHttp().post('/notifications/send', options.body)
  },
  
  // Get notifications for user
  getUserNotificationsApi: (userId: string) => {
    return useHttp().get(`/notifications/user/${userId}`)
  },
  
  // Mark notification as read
  markNotificationReadApi: (notificationId: string) => {
    return useHttp().put(`/notifications/${notificationId}/read`)
  },
  
  // Delete notification
  deleteNotificationApi: (notificationId: string) => {
    return useHttp().delete(`/notifications/${notificationId}`)
  },
  
  // Send email notification
  sendEmailNotificationApi: (options: { body: { to: string, subject: string, content: string } }) => {
    return useHttp().post('/notifications/email', options.body)
  },
  
  // Send SMS notification
  sendSmsNotificationApi: (options: { body: { phone: string, message: string } }) => {
    return useHttp().post('/notifications/sms', options.body)
  },
  
  // Get notification templates
  getNotificationTemplatesApi: () => {
    return useHttp().get('/notifications/templates')
  },
  
  // Create notification template
  createNotificationTemplateApi: (options: { body: any }) => {
    return useHttp().post('/notifications/templates', options.body)
  },
  
  // Update notification template
  updateNotificationTemplateApi: (templateId: string, options: { body: any }) => {
    return useHttp().put(`/notifications/templates/${templateId}`, options.body)
  },
  
  // Delete notification template
  deleteNotificationTemplateApi: (templateId: string) => {
    return useHttp().delete(`/notifications/templates/${templateId}`)
  },
  
  // Send bulk notifications
  sendBulkNotificationsApi: (options: { body: { userIds: string[], notification: any } }) => {
    return useHttp().post('/notifications/bulk', options.body)
  }
}
