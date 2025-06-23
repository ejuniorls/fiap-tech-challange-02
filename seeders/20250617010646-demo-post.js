/* eslint-disable no-unused-vars */
"use strict";

const { Post } = require("../models");
const { generateUniqueSlug } = require("../utils/slug");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Dados dos posts com conteúdo garantido
    const postsData = [
      {
        title: "Introdução à Programação Web",
        excerpt:
          "Aprenda os conceitos básicos de desenvolvimento web moderno com HTML, CSS e JavaScript.",
        content:
          "Este artigo aborda os fundamentos da programação web, incluindo HTML para estrutura, CSS para estilização e JavaScript para interatividade. Discutiremos também as melhores práticas e recursos para iniciantes.",
        status: "published",
        publishedAt: new Date(),
      },
      {
        title: "Os Benefícios do Exercício Físico",
        excerpt:
          "Descubra como a atividade física regular pode melhorar sua saúde e qualidade de vida.",
        content:
          "Neste post, exploramos os diversos benefícios do exercício físico, desde melhorias na saúde cardiovascular até os efeitos positivos na saúde mental. Incluímos recomendações para diferentes níveis de condicionamento.",
        status: "published",
        publishedAt: new Date(Date.now() - 86400000),
      },
      {
        title: "Guia Completo de React.js",
        excerpt:
          "Tudo o que você precisa saber para começar com React.js em 2024.",
        content:
          "Um guia abrangente sobre React.js cobrindo desde a configuração inicial até conceitos avançados como hooks e context API. Inclui exemplos práticos e dicas para evitar erros comuns.",
        status: "published",
        publishedAt: new Date(Date.now() - 172800000),
      },
      {
        title: "Alimentação Saudável para Iniciantes",
        excerpt: "Dicas práticas para melhorar sua alimentação no dia a dia.",
        content:
          "Este artigo oferece um plano de alimentação saudável para iniciantes, com dicas sobre como fazer escolhas alimentares mais nutritivas, planejar refeições e manter hábitos alimentares saudáveis a longo prazo.",
        status: "draft",
      },
      {
        title: "Tendências de Tecnologia para 2024",
        excerpt:
          "As principais inovações tecnológicas que vão dominar o próximo ano.",
        content:
          "Analisamos as tendências tecnológicas emergentes para 2024, incluindo avanços em inteligência artificial, computação quântica, realidade aumentada e desenvolvimento sustentável de tecnologia.",
        status: "published",
        publishedAt: new Date(Date.now() - 259200000),
      },
      {
        title: "Como Melhorar sua Produtividade",
        excerpt:
          "Técnicas comprovadas para aumentar sua eficiência no trabalho.",
        content:
          "Compartilhamos métodos cientificamente comprovados para melhorar a produtividade, incluindo técnicas de gerenciamento de tempo, ferramentas úteis e estratégias para manter o foco.",
        status: "archived",
      },
      {
        title: "O Futuro da Inteligência Artificial",
        excerpt:
          "Como a IA está transformando diversas indústrias e o que esperar.",
        content:
          "Uma análise aprofundada do impacto atual e futuro da inteligência artificial em setores como saúde, educação, manufatura e serviços financeiros, com insights de especialistas do setor.",
        status: "published",
        publishedAt: new Date(Date.now() - 345600000),
      },
      {
        title: "Viagens Econômicas: Dicas para Viajar Mais Gastando Menos",
        excerpt: "Aprenda a planejar viagens incríveis sem gastar muito.",
        content:
          "Descubra como viajar de forma econômica sem sacrificar experiências. Cobrimos desde como encontrar passagens aéreas baratas até dicas para economizar em hospedagem e alimentação durante suas viagens.",
        status: "draft",
      },
      {
        title: "Fundamentos de Design Gráfico",
        excerpt:
          "Princípios básicos que todo designer iniciante deve conhecer.",
        content:
          "Introdução aos princípios fundamentais do design gráfico, incluindo teoria das cores, tipografia, hierarquia visual e composição. Ideal para quem está começando na área.",
        status: "published",
        publishedAt: new Date(Date.now() - 432000000),
      },
      {
        title: "Como se Tornar um Empreendedor de Sucesso",
        excerpt: "Passos essenciais para iniciar e manter um negócio próspero.",
        content:
          "Um guia passo a passo para aspirantes a empreendedores, cobrindo desde a identificação de oportunidades de negócio até estratégias de crescimento e gestão financeira.",
        status: "published",
        publishedAt: new Date(Date.now() - 518400000),
      },
    ];

    // Processamento assíncrono dos posts
    const posts = [];

    for (const postData of postsData) {
      const slug = await generateUniqueSlug(Post, postData.title);

      posts.push({
        title: postData.title,
        slug: slug,
        excerpt: postData.excerpt,
        content: postData.content,
        status: postData.status,
        published_at: postData.publishedAt || null, // Usando o nome da coluna no banco
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    console.log("Dados a serem inseridos:", JSON.stringify(posts, null, 2));

    // Inserção no banco de dados
    await queryInterface.bulkInsert("posts", posts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("posts", null, {});
  },
};
