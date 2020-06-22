import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>;
      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repositories>
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/44378835?s=460&u=5cc627925afcb8449f9a01894f212ddf492cc921&v=4"
            alt="Samuel Neves"
          />

          <div>
            <strong>test/repository</strong>
            <p>Teste de descriçao de repositório Github</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/44378835?s=460&u=5cc627925afcb8449f9a01894f212ddf492cc921&v=4"
            alt="Samuel Neves"
          />

          <div>
            <strong>test/repository</strong>
            <p>Teste de descriçao de repositório Github</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/44378835?s=460&u=5cc627925afcb8449f9a01894f212ddf492cc921&v=4"
            alt="Samuel Neves"
          />

          <div>
            <strong>test/repository</strong>
            <p>Teste de descriçao de repositório Github</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
