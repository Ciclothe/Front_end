import { CardCondition } from "./Components/CardCondition";

interface Props {
  goToNextStep: () => void;
}

const conditions = [
  {
    id: 0,
    name: "usado_con_desgaste",
    label: "Usado con desgaste",
  },
  {
    id: 1,
    name: "buen_estado",
    label: "Buen estado",
  },
  {
    id: 2,
    name: "como_nuevo",
    label: "Como nuevo",
  },
  {
    id: 3,
    name: "nuevo_sin_etiqueta",
    label: "Nuevo sin etiqueta",
  },
  {
    id: 4,
    name: "nuevo_con_etiqueta",
    label: "Nuevo con etiqueta",
  },
];

export const GarmentInformation = ({ goToNextStep }: Props) => {
  return (
    <div className="border p-4 rounded-2xl mt-4">
      <h2>¿En qué condición está?</h2>
      <div>
        <CardCondition conditions={conditions} />
      </div>
    </div>
  );
};
