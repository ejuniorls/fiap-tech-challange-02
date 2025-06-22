/* eslint-disable no-unused-vars */
"use strict";

const { Category } = require("../models");
const { generateUniqueSlug } = require("../utils/slug");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categoriesData = [
      {
        name: "Matemática Básica",
        description:
          "Conceitos fundamentais de matemática para alunos iniciantes",
      },
      {
        name: "Português",
        description: "Gramática, redação e interpretação de textos",
      },
      {
        name: "Ciências Naturais",
        description: "Biologia, física e química para ensino fundamental",
      },
      {
        name: "História Geral",
        description: "Eventos históricos importantes e suas consequências",
      },
      {
        name: "Geografia",
        description: "Estudo da Terra, países e fenômenos naturais",
      },
      {
        name: "Educação Física",
        description: "Atividades físicas e saúde escolar",
      },
      { name: "Artes", description: "Expressão artística e história da arte" },
      { name: "Música", description: "Teoria musical e prática instrumental" },
      { name: "Inglês", description: "Aprendizado da língua inglesa" },
      { name: "Espanhol", description: "Aprendizado da língua espanhola" },
      {
        name: "Informática Educativa",
        description: "Tecnologia aplicada à educação",
      },
      {
        name: "Projetos Interdisciplinares",
        description: "Atividades que integram várias disciplinas",
      },
      {
        name: "Educação Ambiental",
        description: "Conscientização ecológica e sustentabilidade",
      },
      {
        name: "Literatura Infantil",
        description: "Livros e contos para crianças",
      },
      {
        name: "Matemática Avançada",
        description: "Álgebra, geometria e cálculo",
      },
      { name: "Física", description: "Conceitos físicos e experimentos" },
      {
        name: "Química",
        description: "Elementos, compostos e reações químicas",
      },
      { name: "Biologia", description: "Estudo da vida e dos organismos" },
      {
        name: "História do Brasil",
        description: "Fatos marcantes da história brasileira",
      },
      {
        name: "Geografia do Brasil",
        description:
          "Características físicas e humanas do território brasileiro",
      },
      {
        name: "Filosofia",
        description: "Pensamento crítico e reflexões filosóficas",
      },
      {
        name: "Sociologia",
        description: "Estudo da sociedade e relações humanas",
      },
      {
        name: "Psicologia Educacional",
        description: "Processos de aprendizagem e desenvolvimento",
      },
      {
        name: "Educação Inclusiva",
        description: "Práticas pedagógicas para inclusão",
      },
      {
        name: "Metodologias Ativas",
        description: "Estratégias de ensino inovadoras",
      },
      {
        name: "Aprendizagem Baseada em Projetos",
        description: "Ensino através da realização de projetos",
      },
      {
        name: "Gamificação na Educação",
        description: "Uso de elementos de jogos no aprendizado",
      },
      {
        name: "Robótica Educacional",
        description: "Introdução à robótica para estudantes",
      },
      {
        name: "Programação para Crianças",
        description: "Lógica de programação e scratch",
      },
      {
        name: "Educação Financeira",
        description: "Conceitos básicos de finanças pessoais",
      },
      {
        name: "Empreendedorismo Juvenil",
        description: "Noções de empreendedorismo para jovens",
      },
      {
        name: "Orientação Profissional",
        description: "Ajuda na escolha de carreiras",
      },
      {
        name: "Preparação para Vestibulares",
        description: "Dicas e conteúdos para provas de ingresso",
      },
      {
        name: "ENEM",
        description:
          "Estratégias e conteúdos para o Exame Nacional do Ensino Médio",
      },
      {
        name: "Olimpíadas Científicas",
        description: "Preparação para competições acadêmicas",
      },
      {
        name: "Debate e Oratória",
        description: "Técnicas de argumentação e expressão oral",
      },
      {
        name: "Teatro na Escola",
        description: "Atividades teatrais e expressão corporal",
      },
      { name: "Coral Escolar", description: "Prática musical em grupo" },
      {
        name: "Jornal Escolar",
        description: "Produção de conteúdo jornalístico na escola",
      },
      {
        name: "Rádio Escolar",
        description: "Produção de conteúdo para rádio na escola",
      },
      { name: "Saúde na Escola", description: "Promoção de hábitos saudáveis" },
      {
        name: "Alimentação Saudável",
        description: "Educação nutricional para estudantes",
      },
      {
        name: "Prevenção ao Bullying",
        description: "Estratégias contra a violência escolar",
      },
      {
        name: "Educação Digital",
        description: "Uso responsável da internet e redes sociais",
      },
      {
        name: "Cidadania Digital",
        description: "Direitos e responsabilidades no ambiente online",
      },
      {
        name: "Biblioteca Escolar",
        description: "Incentivo à leitura e pesquisa",
      },
      {
        name: "Feira de Ciências",
        description: "Projetos e experimentos científicos",
      },
      {
        name: "Excursões Pedagógicas",
        description: "Aprendizado fora da sala de aula",
      },
      {
        name: "Educação Parental",
        description: "Orientação para pais e responsáveis",
      },
      {
        name: "Gestão Escolar",
        description: "Administração e organização da escola",
      },
    ];

    // Processamento das categorias (geração de slug)
    const categories = await Promise.all(
      categoriesData.map(async (category) => {
        return {
          name: category.name,
          description: category.description,
          slug: await generateUniqueSlug(Category, category.name),
          created_at: new Date(),
          updated_at: new Date(),
        };
      }),
    );

    await queryInterface.bulkInsert("categories", categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
