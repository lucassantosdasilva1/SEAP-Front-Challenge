//Consertar a tipagem
//Fazer a edicao, exclusao, adicao por meio do context

import React, { createContext, useContext, useState } from "react";

import { detentosDTO } from "../DTO/DetentosDTO";

import api from "../service/api";

import { UnidadesDTO } from "../DTO/UnidadesDTO";
import { atendimentosDTO } from "../DTO/AtendimentosDTO";

interface DetentosContextProps {
  children: JSX.Element;
}

export interface EditAtendimentoDataType {
  id: number;
  detento: string;
  tipoAtendimento: string;
}

export interface EditDetentoDataType {
  id: number;
  nome: string;
  unidade: string;
  nomeMae: string;
  cpf: string;
}

interface IDataContext {
  // Unidades
  unidades: UnidadesDTO[];
  setUnidades: React.Dispatch<React.SetStateAction<UnidadesDTO[]>>;
  getUnidades: () => Promise<{ data: UnidadesDTO[] }>;
  // Atendimento
  atendimentos: atendimentosDTO[];
  datasourceAtend: EditAtendimentoDataType[];
  setDatasouceAtend: React.Dispatch<
    React.SetStateAction<EditAtendimentoDataType[]>
  >;
  setAtendimentos: React.Dispatch<React.SetStateAction<atendimentosDTO[]>>;
  getAtendimentos: () => Promise<{ data: atendimentosDTO[] }>;
  editAtendimentos: (value: atendimentosDTO) => void;
  postAtendimentos: (value: atendimentosDTO) => void;
  deleteAtendimentos: (id: number) => void;
  // Detentos
  detentos: detentosDTO[];
  datasource: EditDetentoDataType[];
  setDatasouce: React.Dispatch<React.SetStateAction<EditDetentoDataType[]>>;
  setDetentos: React.Dispatch<React.SetStateAction<detentosDTO[]>>;
  getDetentos: () => Promise<{ data: detentosDTO[] }>;
  editDetentos: (value: detentosDTO) => void;
  postDetentos: (value: detentosDTO) => void;
  deleteDetentos: (id: number) => void;
}

const DetentosContext = createContext({} as IDataContext);

export default function detentosProvider({ children }: DetentosContextProps) {
  const [detentos, setDetentos] = useState<detentosDTO[]>([]);
  const [datasource, setDatasouce] = useState<EditDetentoDataType[]>([]);
  const [unidades, setUnidades] = useState<UnidadesDTO[]>([]);

  // ===== getUnidades =====
  async function getUnidades() {
    try {
      return await api.get("/unidades/");
    } catch (error) {}
  }

  // =====Atendimentos ====
  const [atendimentos, setAtendimentos] = useState<atendimentosDTO[]>([]);
  const [datasourceAtend, setDatasouceAtend] = useState<EditAtendimentoDataType[]>(
    []
  );

  // =====Function Dententos ====

  async function getDetentos() {
    try {
      const response = await api.get("/detentos");
      const data: detentosDTO[] = response.data;

      const ListaDetentos: EditDetentoDataType[] = data.map((detento) => ({
        id: detento.id,
        nome: detento.nome,
        unidade: detento.unidade.descricao,
        nomeMae: detento.nomeMae,
        cpf: detento.cpf,
      }));

      setDatasouce(ListaDetentos);
      setDetentos(data);

      return await api.get("/detentos");
    } catch (error) {
      throw error;
    }
  }

  async function editDetentos(value: detentosDTO) {
    const newDetentos = detentos.map((detento) => {
      if (detento.id === value.id) {
        detento = value;
      }
      return detento; // retorna o produto atualizado
    });
    setDetentos(newDetentos);

    try {
      await api.put(`/detentos/${value.id}`, value); // value é o produto atualizado
    } catch (error) {
      throw error;
    }
  }

  async function deleteDetentos(id: number) {
    const newDetentos = detentos.filter((detento) => {
      if (detento.id !== id) {
        return detento;
      }
    });

    const ListaDetentos: EditDetentoDataType[] = newDetentos.map((detento) => ({
      id: detento.id,
      nome: detento.nome,
      unidade: detento.unidade.descricao,
      nomeMae: detento.nomeMae,
      cpf: detento.cpf,
    }));

    setDatasouce(ListaDetentos);
    setDetentos(newDetentos);

    try {
      await api.delete(`/detentos/${id}`);
    } catch (error) {
      throw error;
    }
  }

  async function postDetentos(value: detentosDTO) {
    const newDetentos = detentos;
    newDetentos.push(value);

    const ListaDetentos: EditDetentoDataType[] = newDetentos.map((detento) => ({
      id: detento.id,
      nome: detento.nome,
      unidade: detento.unidade.descricao,
      nomeMae: detento.nomeMae,
      cpf: detento.cpf,
    }));
    setDatasouce(ListaDetentos);
    setDetentos(newDetentos);

    try {
      await api.post(`/detentos/`, value); // value é o produto atualizado
    } catch (error) {
      throw error;
    }
  }

  // =====Function Atendimentos====

  async function getAtendimentos() {
    try {
      const response = await api.get("/atendimentos");
      const data: atendimentosDTO[] = response.data;

      const ListaAtendimentos: EditAtendimentoDataType[] = data.map(
        (atendimento) => ({
          id: atendimento.id,
          detento: atendimento.detento.nome,
          tipoAtendimento: atendimento.tipoAtendimento.descricao,
        })
      );

      setDatasouceAtend(ListaAtendimentos);
      setAtendimentos(data);

      return await api.get("/detentos");
    } catch (error) {
      throw error;
    }
  }

  async function editAtendimentos(value: atendimentosDTO) {
    const newAtendimentos = atendimentos.map((atendimento) => {
      if (atendimento.id === value.id) {
        atendimento = value;
      }
      return atendimento; // retorna o produto atualizado
    });
    setAtendimentos(newAtendimentos);

    try {
      await api.put(`/atendimentos/${value.id}`, value); // value é o produto atualizado
    } catch (error) {
      throw error;
    }
  }

  async function deleteAtendimentos(id: number) {
    const newAtendimentos = atendimentos.filter((atendimento) => {
      if (atendimento.id !== id) {
        return atendimento;
      }
    });

    const ListaAtendimentos: EditAtendimentoDataType[] = newAtendimentos.map(
      (atendimento) => ({
        id: atendimento.id,
        detento: atendimento.detento.nome,
        tipoAtendimento: atendimento.tipoAtendimento.descricao,
      })
    );

    setDatasouceAtend(ListaAtendimentos);
    setAtendimentos(newAtendimentos);

    try {
      await api.delete(`/atendimentos/${id}`);
    } catch (error) {
      throw error;
    }
  }

  async function postAtendimentos(value: atendimentosDTO) {
    const newAtendimentos = atendimentos;
    newAtendimentos.push(value);

    const ListaAtendimentos: EditAtendimentoDataType[] = newAtendimentos.map(
      (atendimento) => ({
        id: atendimento.id,
        detento: atendimento.detento.nome,
        tipoAtendimento: atendimento.tipoAtendimento.descricao,
      })
    );

    setDatasouceAtend(ListaAtendimentos);
    setAtendimentos(newAtendimentos);

    try {
      await api.post(`/atendimentos/`, value); // value é o produto atualizado
    } catch (error) {
      throw error;
    }
  }

  return (
    <DetentosContext.Provider
      value={{
        unidades,
        getUnidades,
        setUnidades,
        detentos,
        datasource,
        getDetentos,
        setDetentos,
        setDatasouce,
        editDetentos,
        postDetentos,
        deleteDetentos,
        atendimentos,
        datasourceAtend,
        setDatasouceAtend,
        setAtendimentos,
        getAtendimentos,
        editAtendimentos,
        postAtendimentos,
        deleteAtendimentos,
      }}
    >
      {children}
    </DetentosContext.Provider>
  );
}

export function useDetento() {
  return useContext(DetentosContext);
}
