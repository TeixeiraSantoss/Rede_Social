<h1>🌐 Rede Social com Angular & .NET</h1>

Este projeto consiste no desenvolvimento de uma aplicação Web no estilo rede social, onde usuários podem criar contas, autenticar-se, postar conteúdos, seguir outros usuários e visualizar postagens de pessoas que seguem. A aplicação foi construída adotando boas práticas de arquitetura, segurança, componentização, reatividade e comunicação entre frontend e backend, visando escalabilidade, manutenção e performance.

<h2>🌐 Frontend – Angular</h2>

O frontend foi construído com Angular, estruturado em módulos e componentes seguindo boas práticas de organização (pages/modelo/componente).
Foram utilizados:
<ul>
<li>Componentes reativos (Reactive Forms) para cadastro, login e edição de postagens, com validações customizadas (ex.: naoSoEspacosValidator).</li>

<li>Two-way Data Binding e Getters/Setters para mecanismos de pesquisa, filtragem de listas e tratamento de estados.</li>

<li>HTTPClient para comunicação com a API e interceptação de respostas.</li>

<li>Rotas dinâmicas para navegar entre perfis de usuários, editar postagens, exibir feed e acessar o próprio perfil.</li>

<li>Diretivas estruturais (*ngIf, *ngFor) e classes condicionais para feedback visual de validações e carregamentos.</li>

<li>Tratamento de mensagens de erro e sucesso nos formulários, simulando um fluxo profissional de UX.</li>

<li>Atualização dinâmica de componentes através do uso de arrays filtrados e propriedades computadas, evitando processamento desnecessário.</li>
</ul>
O layout inclui botões dinâmicos ("Seguir" / "Deixar de seguir"), pré-carregamento da postagem atual no formulário ao editar e navegação “voltar” utilizando Location.back().

<h2>⚙️ Backend – .NET + Entity Framework Core</h2>

O backend foi desenvolvido usando ASP.NET Core Web API, com:
<ul>
<li>Entity Framework Core como ORM.</li>

<li>SQLite na fase inicial e possibilidade de migração futura para MySQL.</li>

<li>Migrations para controle de versão do banco.</li>

<li>Arquitetura limpa de controllers + models + DTOs para organização das camadas.</li>

<li>Relacionamentos configurados:</li>
  <ul>
  <li>Usuário → Postagem (1:N)</li>

  <li>Usuário → Seguidores/Seguindo (auto-relacionamento N:N)</li>
  </ul>
</ul>
A API implementa métodos para:
<ul>
<li>CRUD de Usuários</li>

<li>CRUD de Postagens</li>

<li>Fluxo completo de “seguir / deixar de seguir”</li>

<li>Listar postagens dos usuários seguidos (feed personalizado)</li>
</ul>
<h3>🔒 Segurança: Hash de Senhas</h3>

A aplicação utiliza o PasswordHasher<T> (padrão do ASP.NET Identity) para:
<ul>
<li>Gerar o hash seguro com salt.</li>

<li>Armazenar somente o hash no banco.</li>

<li>Verificar a senha no login usando VerifyHashedPassword.</li>
</ul>
Esse processo garante segurança, evita exposição de senhas e segue boas práticas da indústria.

<h2>🔄 Fluxos Técnicos Importantes</h2>
<h3>1. Autenticação via Sessão</h3>

A aplicação utiliza Session para armazenar o ID do usuário logado — solução simples, eficiente e sem JWT.

<h3>2. Verificação de seguidores</h3>

A lógica compara a lista “seguindo” do usuário logado para determinar se ele já segue determinado usuário, atualizando a UI em tempo real.

<h3>3. Feed Personalizado</h3>

A API retorna apenas as postagens de usuários seguidos, otimizando o carregamento e reduzindo consultas repetidas.

<h3>4. Pesquisa de Usuários</h3>

Implementada no Angular usando:
<ul>
<li>Getter & Setter</li>

<li>Normalização de strings (remoção de acentos, espaços e case-insensitive)</li>

<li>includes() ao invés de indexOf() por ser mais moderno, legível e claro.</li>
</ul>
<h3>5. Edição de postagem</h3>

O componente de edição:
<ul>
<li>Preenche automaticamente o formulário com dados existentes.</li>

<li>Usa Reactive Forms + patchValue.</li>

<li>Revalida os campos.</li>

<li>Exibe mensagens de validação em tempo real.</li>
</ul>
<h3>6. Estrutura de DTOs</h3>

A aplicação separa:
<ul>
<li>DTOs para entrada (CreateDTO)</li>

<li>DTOs para leitura (ReadDTO)</li>

<li>DTOs para edição (UpdateDTO)</li>

<li>DTOs específicos para contexto (ex.: UsuarioFindDTO)</li>
</ul>
Garantindo segurança e evitando exposições indevidas.
