import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { AuthPage } from '../auth/auth.page';
import { Message, supabaseService } from 'src/app/Services/supabase.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ChatPage implements OnInit {

  private chatService = inject(supabaseService);
  private authService = inject(AuthPage);

  messages: Message[] = [];
  newMessage = '';

  ngOnInit() {
    this.chatService.getMessagesObservable().subscribe(msgs => {
      this.messages = msgs;
      console.log("Mensajes: ", this.messages)
    });
    
    this.chatService.fetchMessages(); // Carga mensajes al iniciar
  }

  async logout() 
  {  
    this.authService.logout();

  }

  async send() {
    const user = await this.authService.getCurrentUser();

    if (!user || !user.email) {
      console.warn('Usuario no autenticado o sin email');
      return;
    }

    const content = this.newMessage.trim();
    if (content) {
      await this.chatService.sendMessage(content, user.email);
      this.newMessage = '';
      this.chatService.fetchMessages();
    }
  }
}
