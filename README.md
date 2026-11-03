# Porto Sorvetes — Cardápio Online

Cardápio estático e responsivo para [GitHub Pages](https://k410sh4.github.io/App/), com 20 produtos, busca, filtros, personalização, carrinho salvo no navegador e montagem de pedidos para WhatsApp.

## Funcionalidades

- **20 produtos** transcritos da fotografia do cardápio, com preços em reais.
- **45 sabores** de milk-shake tradicional, **14 especiais** e **3 Fini**.
- **20 ilustrações SVG originais**, uma por item, leves e sem dependências externas.
- Escolha de recipientes e recheios para os produtos aplicáveis.
- Carrinho com quantidades, adicionais, observações, retirada ou consulta de entrega.
- Cálculo do subtotal e composição automática de texto para WhatsApp, com confirmação pelo cliente.
- Validação do preço ao restaurar o carrinho; o armazenamento do navegador não é fonte confiável para preços.
- UX mobile com áreas de toque ampliadas, indicação de foco, suporte a movimento reduzido e fallback sem JavaScript.

## Instalação e publicação

O repositório publica a branch **main** na pasta **/(root)** pelo GitHub Pages. Confira o resultado em **Actions → pages build and deployment**.

## WhatsApp comercial

Abra [config.js](config.js) e substitua `whatsapp: ""` por **55 + DDD + telefone comercial**, apenas dígitos, sem sinal de +. Exemplo de formato **fictício**: `5535999999999`.

Até configurar o número real, o botão de WhatsApp permanece desativado e é possível copiar o pedido. O site **não envia mensagens automaticamente**: abre o WhatsApp com a mensagem pré-preenchida, e o cliente confirma o envio. A automação de atendimento, cobranças e confirmação de pedidos exige infraestrutura adicional e integração autorizada.

## Estrutura

| Caminho | Função |
| --- | --- |
| `index.html` | Semântica, cabeçalho, catálogo, modal, carrinho e finalização |
| `assets/css/styles.css` | Design System, responsividade e acessibilidade |
| `assets/js/app.js` | Produtos, filtros, estado, carrinho e mensagem do pedido |
| `assets/products/*.svg` | Ilustrações vetoriais independentes por produto |
| `config.js` | Número comercial público, **nunca** tokens ou chaves secretas |
| `scripts/check-site.mjs` | Testes estáticos de catálogo e recursos |
| `.github/workflows/quality.yml` | CI automático de JavaScript e SVG/XML |

## Testes

O workflow **Qualidade do cardápio** valida sintaxe de JavaScript, arquivos vinculados, número e unicidade de produtos, presença de imagens e XML bem formado. Estes **testes estáticos não substituem** validação de teclado, leitor de tela, desempenho, zoom e responsividade em navegador real.

## Observações comerciais e fidelidade

Os preços e sabores provêm da foto enviada; é necessário que a loja confira o cardápio antes de divulgação comercial. **Imagens são ilustrativas**, não representam fotografias oficiais dos produtos. Taxas, disponibilidade, retirada e entrega precisam ser confirmadas com o estabelecimento.

O carrinho é salvo localmente; não existe backend ou pagamento online.
