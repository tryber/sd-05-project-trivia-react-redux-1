export default function scoreCalculation(time, dif) {
  let difValue = 0;
  switch (dif) {
    case 'hard':
      difValue = 3;
      break;
    case 'medium':
      difValue = 2;
      break;
    case 'easy':
      difValue = 1;
      break;
    default:
      return 10;
  }
  return ((difValue * time) + 10);
}

//Função Criada por Rodrigo Batista e utilizado com sua autorização.
