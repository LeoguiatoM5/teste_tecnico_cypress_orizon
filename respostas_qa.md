# Cenários BDD

## Questão 1 — Carrinho de compras

```gherkin
Funcionalidade: Gerenciamento de produtos no carrinho
  Como cliente da loja virtual
  Quero adicionar produtos ao carrinho e alterar suas quantidades
  Para realizar a compra de acordo com a disponibilidade em estoque

  Contexto:
    Dado que o produto "Teclado Mecânico" custa R$ 200,00
    E possui 5 unidades disponíveis em estoque

  Cenário: Adicionar um produto disponível ao carrinho
    Dado que o cliente está na página do produto "Teclado Mecânico"
    Quando adicionar 1 unidade ao carrinho
    Então o produto "Teclado Mecânico" deve ser exibido no carrinho
    E a quantidade deve ser igual a 1
    E o subtotal deve ser igual a R$ 200,00

  Cenário: Atualizar a quantidade do produto no carrinho
    Dado que o cliente possui 1 unidade do produto "Teclado Mecânico" no carrinho
    Quando alterar a quantidade para 3 unidades
    Então a quantidade do produto deve ser atualizada para 3
    E o subtotal deve ser atualizado para R$ 600,00

  Cenário: Tentar adicionar uma quantidade superior ao estoque
    Dado que o cliente possui o produto "Teclado Mecânico" no carrinho
    Quando tentar alterar a quantidade para 6 unidades
    Então o sistema não deve permitir a atualização
    E deve exibir a mensagem "Quantidade indisponível em estoque"
    E a quantidade no carrinho não deve ultrapassar as 5 unidades disponíveis
```

## Questão 2 — Transferência entre contas

```gherkin
Funcionalidade: Transferência entre contas
  Como cliente do banco
  Quero transferir valores para outra conta
  Para movimentar meu saldo com segurança

  Contexto:
    Dado que o cliente está autenticado no internet banking
    E possui uma conta com saldo de R$ 1.000,00
    E a conta de destino informada é válida

  Cenário: Realizar uma transferência válida
    Quando o cliente transferir R$ 200,00 para a conta de destino
    Então a transferência deve ser concluída com sucesso
    E o saldo da conta de origem deve ser atualizado para R$ 800,00
    E o sistema deve exibir o comprovante da transferência

  Cenário: Tentar realizar uma transferência com saldo insuficiente
    Quando o cliente tentar transferir R$ 1.200,00 para a conta de destino
    Então a transferência deve ser recusada
    E o sistema deve exibir a mensagem "Saldo insuficiente"
    E o saldo da conta de origem deve permanecer em R$ 1.000,00
    E nenhum valor deve ser creditado na conta de destino

  Cenário: Registrar uma transferência concluída
    Quando o cliente transferir R$ 150,00 para a conta de destino
    Então a transferência deve ser concluída com sucesso
    E uma transação deve ser registrada no extrato da conta de origem
    E o registro deve apresentar data, horário, valor e conta de destino
    E deve possuir um identificador único
    E o status da transação deve ser "Concluída"
```
