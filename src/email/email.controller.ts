import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() body: { date: string }) {
    const { date } = body;

    console.log("📩 Requisição recebida em /email/send");
    console.log("👉 Dados recebidos do frontend:", body);

    const result = await this.emailService.sendMail(
      "joaopedev@outlook.com",
      "Ela aceitou o convite 🎉",
      `Boa notícia! Tata aceitou o jantar para ${date}.`,
      `
        <div style="font-family: Arial, sans-serif; text-align: center; background-color: #e0ffe0; padding: 20px; border-radius: 12px;">
          <h1 style="color: #28a745;">🎉 Confirmação 🎉</h1>
          <p style="font-size: 18px; color: #333;">
            Ela aceitou o convite! O jantar está marcado.
          </p>
          <p style="font-size: 20px; font-weight: bold; color: #28a745;">
            Data escolhida: ${date}
          </p>
          <p style="font-size: 16px; color: #555;">
            Prepare-se para uma noite especial 😍
          </p>
        </div>
      `
    );

    console.log("✅ Email enviado com sucesso!");
    console.log("📨 Detalhes do envio:", result);

    return { message: "Email enviado com sucesso!", dateConfirmada: date };
  }
}
