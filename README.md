# Projeto 83

Aplicativo pessoal de treino e evolução corporal, construído em React + Vite.

## Objetivo

Começar em **97 kg**, acompanhar a evolução semanal e trabalhar em direção à faixa de **80–83 kg**, priorizando força, consistência e redução de medidas.

## Primeira versão

- Sidebar no desktop e navegação inferior no celular
- Layout responsivo com scroll controlado apenas na área principal
- Treinos de segunda a sexta
- Registro de carga e repetições por série
- Cronômetro automático de descanso
- Histórico local dos treinos concluídos
- Evolução de peso e cintura
- Biblioteca de exercícios com instruções e busca de demonstrações em vídeo
- Persistência no `localStorage`

## Rodando localmente

```bash
npm install
npm run dev
```

Depois abra o endereço exibido pelo Vite no navegador.

## Build de produção

```bash
npm run build
npm run preview
```

## Próximas etapas

1. Validar a experiência real durante os treinos.
2. Selecionar vídeos demonstrativos confiáveis para cada exercício e máquina.
3. Melhorar a lógica de progressão de carga.
4. Adicionar Supabase para histórico sincronizado.
5. Transformar em PWA instalável.
