
import { Injectable } from '@angular/core';
import { Resend } from 'resend';

@Injectable({
  providedIn: 'root'
})
export class ResendService {
  private resend: Resend;

  constructor() {    
    this.resend = new Resend('re_UmK77YDw_JKwH3AYLMfj2ydQkJYwANeJH');
  }

  
  sendEmail(to: string, subject: string, text: string) {
    return this.resend.emails.send({
      to,
      subject,
      text,
      from: 'jsaquicela26@gmail.com', // Dirección de correo del remitente
    })
  }
}
