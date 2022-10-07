import { formatDistanceToNow } from 'date-fns/esm'
import { ptBR } from 'date-fns/locale'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)
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
            {cycles.map(
              ({
                id,
                minutesAmount,
                startDate,
                task,
                interruptedDate,
                finishedDate,
              }) => {
                let status = 'Em andamento'
                let color: 'yellow' | 'green' | 'red' = 'yellow'
                if (interruptedDate) {
                  status = 'Interrompido'
                  color = 'red'
                } else if (finishedDate) {
                  status = 'Finalizado'
                  color = 'green'
                }
                const distance = formatDistanceToNow(startDate, {
                  addSuffix: true,
                  locale: ptBR,
                })

                return (
                  <tr key={id}>
                    <td>{task}</td>
                    <td>{minutesAmount} minutos</td>
                    <td title="">{distance}</td>
                    <td>
                      <Status statusColor={color}>{status}</Status>
                    </td>
                  </tr>
                )
              },
            )}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
