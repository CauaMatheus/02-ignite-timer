import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const itens: string[] = new Array(10).fill('')

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((_, index) => (
              <tr key={index}>
                <td>Tarefa 01</td>
                <td>20 minutos</td>
                <td>há 2 anos</td>
                <td>
                  <Status statusColor="green">Concluído</Status>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
