# Porto Sorvetes — Cardápio Online

Site estático para GitHub Pages com cardápio, filtros, escolha de sabores, carrinho salvo no navegador e geração automática de mensagem de pedido para WhatsApp.

## Publicação no GitHub Pages

1. Abra **Settings → Pages** no repositório.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Escolha a branch **main**, a pasta **/(root)** e salve.
4. O endereço ficará no formato `https://k410sh4.github.io/App/` após a publicação pelo GitHub.

## Configuração indispensável do WhatsApp

Abra **config.js** e substitua `whatsapp: ""` pelo número REAL do WhatsApp da loja, em formato internacional **55 + DDD + número**. Exemplo de formato (fictício): `5535999999999`. Não inclua sinal +, espaços nem traços.

Sem essa configuração, o botão de envio fica desativado, evitando pedidos para contatos errados. O botão **Copiar texto do pedido** continua disponível.

## Como funciona

O cliente escolhe produtos, sabores e quantidades, preenche seu nome e opção de retirada ou consulta de entrega e toca em **Enviar pedido pelo WhatsApp**. O site abre o WhatsApp com uma mensagem montada automaticamente. O cliente precisa confirmar o envio. **Este site não envia mensagens sem ação do cliente e não é um bot autônomo do WhatsApp.** Automação de atendimento e notificações requer integração autorizada com a WhatsApp Business Platform e infraestrutura adicional.

## Origem dos dados e limites

Os produtos, sabores e preços foram transcritos da fotografia do cardápio fornecida. Os sabores de sorvete de massa e regras de entrega/pagamento não aparecem no material e **não foram inventados**. O responsável deve confirmar preços, produtos, disponibilidade e taxa de entrega antes de publicar. A foto original não é necessária para o funcionamento do site.

## Projeto

- `index.html`: estilos, interface, catálogo, carrinho e lógica de pedidos (sem dependências externas).
- `config.js`: configuração pública do WhatsApp comercial (não armazene tokens ou dados secretos aqui).
- `.nojekyll`: publicação de arquivos estáticos sem processamento Jekyll.

Os dados do carrinho são mantidos apenas em localStorage do dispositivo. Não há backend, cobrança online ou armazenamento de pedidos em servidor.
