# Playground: Angular 8 + Ion Brisanet

Projeto de estudo para os dias 4 e 5: gestão de usuários com a API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com).

## Versões fixadas

- Angular: `8.1.3` (todos os pacotes `@angular/*` essenciais).
- Angular CLI: `8.1.3`.
- Ion Brisanet: `@brisanet/ion@0.0.122`.
- Node recomendado: `12.22.x`; é a versão declarada pela própria branch `support/v8` do Ion.

`0.12.22.12` não é uma versão publicada de `@brisanet/ion`. A versão `0.0.122` é a publicação compatível com Angular 8.1.3 na linha consultada. O pacote foi baixado em [`vendor/ion-0.0.122.tgz`](vendor/ion-0.0.122.tgz) e o SHA-512 foi conferido com a integridade informada pelo registro npm.

## Executar

```powershell
nvm install 12.22.12
nvm use 12.22.12
npm install
npm start
```

Abra `http://localhost:4200`. O `package.json` fixa as versões, portanto `npm install` instala exatamente a combinação de Angular 8 e Ion indicada.

## Rotas e API

| Tela | Rota do app | Endpoint |
| --- | --- | --- |
| Lista de usuários | `/users` | `GET /users` |
| Perfil do usuário | `/users/:id` | `GET /users/:id` |
| Publicações | `/users/:id/posts` | `GET /users/:id/posts` |
| Novo usuário | modal na lista | `POST /users` |
| Excluir usuário | ação na lista | `DELETE /users/:id` |

JSONPlaceholder simula POST e DELETE: as mudanças são refletidas somente na lista local da sessão, como explicado pela própria API.

## O que foi aplicado do exercício

- Modal Ion com formulário reativo para adicionar usuário.
- `ion-input`, `ion-select` e `ion-checkbox`, com validações de nome, e-mail e área obrigatória.
- Feedback visual: `ion-message` no erro do formulário e notificações Ion de sucesso/erro.
- `ion-spinner` em toda requisição, `ion-message` para falhas e `ion-no-data` para listas vazias.
- Tooltips nas ações e `ion-popconfirm` antes de excluir.
- Organização por `CoreModule`, módulo lazy de usuários, páginas, componente de modal e serviço de API.

Os controles de formulário desta versão do Ion usam os eventos `valueChange`, `events` e `ionClick` em vez de `ControlValueAccessor`. Por isso o componente de modal atualiza cada `FormControl` explicitamente; o `FormGroup` continua sendo a fonte de verdade e as validações permanecem reativas.

## Referência de stories consultada

Foram usados os exemplos da branch [`support/v8`](https://github.com/Brisanet/ion/tree/support/v8), sobretudo os stories de `Modal`, `Input`, `InputSelect`, `Tooltip`, `Popconfirm`, `Spinner`, `NoData` e `Message`. Eles determinaram os módulos importados, os nomes dos eventos e as propriedades dos componentes usados aqui.
