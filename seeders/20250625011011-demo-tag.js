/* eslint-disable no-unused-vars */
"use strict";

const { Tag } = require("../models");
const { generateUniqueSlug } = require("../utils/slug");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tagsData = [
      {
        name: "Aprendizagem Ativa",
        description:
          "Estratégias que colocam o aluno no centro do processo de aprendizagem",
      },
      { name: "BNCC", description: "Base Nacional Comum Curricular" },
      {
        name: "Cognição",
        description: "Processos mentais relacionados ao aprendizado",
      },
      {
        name: "Currículo Escolar",
        description: "Organização dos conteúdos educacionais",
      },
      { name: "Didática", description: "Técnicas e métodos de ensino" },
      {
        name: "Educação 4.0",
        description: "Tendências educacionais na era digital",
      },
      {
        name: "Ensino Híbrido",
        description: "Combinação de ensino presencial e online",
      },
      { name: "Flipped Classroom", description: "Sala de aula invertida" },
      {
        name: "Gamificação",
        description: "Uso de elementos de jogos na educação",
      },
      {
        name: "Habilidades Socioemocionais",
        description: "Desenvolvimento de competências não-cognitivas",
      },
      {
        name: "Inclusão Digital",
        description: "Acesso e uso de tecnologias por todos",
      },
      {
        name: "Jogos Educativos",
        description: "Utilização de jogos como ferramenta pedagógica",
      },
      {
        name: "Letramento Digital",
        description: "Habilidades para navegar no mundo digital",
      },
      {
        name: "Metodologias Ativas",
        description: "Abordagens que tornam o aluno protagonista",
      },
      {
        name: "Neuroeducação",
        description: "Intersecção entre neurociência e educação",
      },
      {
        name: "ODS na Educação",
        description:
          "Objetivos de Desenvolvimento Sustentável aplicados à educação",
      },
      { name: "PBL", description: "Aprendizagem Baseada em Projetos" },
      {
        name: "Quiz Educacional",
        description: "Uso de questionários como ferramenta de aprendizagem",
      },
      {
        name: "Recursos Digitais",
        description: "Ferramentas tecnológicas para educação",
      },
      {
        name: "STEAM",
        description:
          "Abordagem integrada de Ciências, Tecnologia, Engenharia, Artes e Matemática",
      },
      {
        name: "Tecnologia Educacional",
        description: "Uso de tecnologias no processo de ensino",
      },
      {
        name: "Avaliação Formativa",
        description: "Processos contínuos de avaliação",
      },
      {
        name: "Biblioteca Virtual",
        description: "Recursos digitais para pesquisa e leitura",
      },
      {
        name: "Comunicação Escolar",
        description: "Estratégias de comunicação na escola",
      },
      {
        name: "Design Thinking",
        description: "Metodologia para solução criativa de problemas",
      },
      { name: "EJA", description: "Educação de Jovens e Adultos" },
      {
        name: "Formação Docente",
        description: "Desenvolvimento profissional de professores",
      },
      {
        name: "Google for Education",
        description: "Ferramentas Google aplicadas à educação",
      },
      {
        name: "História da Educação",
        description: "Evolução das práticas educacionais",
      },
      {
        name: "Interdisciplinaridade",
        description: "Integração entre diferentes disciplinas",
      },
      {
        name: "Jovens Empreendedores",
        description: "Educação empreendedora para estudantes",
      },
      { name: "Kahoot", description: "Plataforma de quizzes educacionais" },
      {
        name: "Libras",
        description: "Língua Brasileira de Sinais na educação",
      },
      { name: "Makerspace", description: "Espaços de criação nas escolas" },
      {
        name: "Nuvem de Palavras",
        description: "Ferramenta visual para aprendizagem",
      },
      {
        name: "Oficinas Pedagógicas",
        description: "Atividades práticas de aprendizagem",
      },
      {
        name: "Pensamento Computacional",
        description: "Habilidades para resolver problemas com lógica",
      },
      {
        name: "QR Code Educacional",
        description: "Uso de códigos QR em atividades pedagógicas",
      },
      {
        name: "Realidade Aumentada",
        description: "Tecnologia imersiva na educação",
      },
      {
        name: "Sala de Aula Invertida",
        description: "Modelo pedagógico que inverte o tradicional",
      },
      {
        name: "Tinkercad",
        description: "Ferramenta para projetos 3D e eletrônica",
      },
      {
        name: "Universidade Escola",
        description: "Relação entre ensino superior e básico",
      },
      {
        name: "Videoaulas",
        description: "Conteúdo educacional em formato de vídeo",
      },
      {
        name: "Webquest",
        description: "Atividade investigativa usando internet",
      },
      {
        name: "Xadrez Educacional",
        description: "Xadrez como ferramenta pedagógica",
      },
      {
        name: "YouTube Educativo",
        description: "Conteúdo educacional no YouTube",
      },
      {
        name: "Zotero",
        description: "Ferramenta para organização de pesquisas",
      },
      {
        name: "Acessibilidade",
        description: "Práticas educacionais inclusivas",
      },
      {
        name: "Bullying",
        description: "Prevenção e combate ao bullying escolar",
      },
      { name: "Cidadania", description: "Educação para a cidadania" },
    ];

    // Processamento das tags (geração de slug)
    const tags = await Promise.all(
      tagsData.map(async (tag) => {
        return {
          name: tag.name,
          description: tag.description,
          slug: await generateUniqueSlug(Tag, tag.name),
          created_at: new Date(),
          updated_at: new Date(),
        };
      }),
    );

    await queryInterface.bulkInsert("tags", tags, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tags", null, {});
  },
};
