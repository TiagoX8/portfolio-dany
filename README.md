# Portfólio — Daniely Gomes Santana

Portfólio de marketing em página única: apresentação, projetos (vídeos, PDFs e peças gráficas) e contato.

Publicado em: https://tiagox8.github.io/portfolio-dany/

## Stack

- HTML único (`src/index.html`) com CSS e JS inline — sem framework
- [Parcel](https://parceljs.org/) apenas para o build e o servidor de desenvolvimento
- Deploy automático no GitHub Pages a cada push na `main`

## Rodando localmente

```bash
nvm use          # versão em .nvmrc
npm ci
npm start        # http://localhost:1234
```

## Build

```bash
npm run build    # gera dist/
```

## Formatação

```bash
npm run format         # aplica o Prettier
npm run format:check   # apenas verifica
```

## Estrutura

```
src/
  index.html        página completa (marcação, estilos e scripts)
  assets/           PDFs, imagens e vídeos usados na página
    videos/         vídeos dos projetos + posters
```

## Ao adicionar mídia

Os arquivos vão direto para o repositório, então mantenha-os leves:

- vídeos: no máximo 720p, H.264 CRF ~26, com `-movflags +faststart` e um poster `.jpg`
- imagens: redimensionadas para o tamanho real de exibição; PNG passado no `pngquant`
- PDFs: comprimidos (`gs -dPDFSETTINGS=/ebook`) e sempre abertos por link, nunca embutidos na página
