import { useEffect, useMemo, useState } from 'react'

interface IFruitVegetableData {
  type: 'Fruit' | 'Vegetable',
  name: string,
  selectedAt?: Date
}

function App() {
  const [fruitVegetableData, setFruitVegetableData] = useState<IFruitVegetableData[]>([
    {
        type: 'Fruit',
        name: 'Apple',
    },
    {
        type: 'Vegetable',
        name: 'Broccoli',
    },
    {
        type: 'Vegetable',
        name: 'Mushroom',
    },
    {
        type: 'Fruit',
        name: 'Banana',
    },
    {
        type: 'Vegetable',
        name: 'Tomato',
    },
    {
        type: 'Fruit',
        name: 'Orange',
    },
    {
        type: 'Fruit',
        name: 'Mango',
    },
    {
        type: 'Fruit',
        name: 'Pineapple',
    },
    {
        type: 'Vegetable',
        name: 'Cucumber',
    },
    {
        type: 'Fruit',
        name: 'Watermelon',
    },
    {
        type: 'Vegetable',
        name: 'Carrot',
    },
  ])

  const unSelectData = useMemo(() => {
    return fruitVegetableData.filter((data) => data.selectedAt === undefined)
  }, [fruitVegetableData])

  const selectedData = useMemo(() => {
    return fruitVegetableData.filter((data) => data.selectedAt !== undefined)
  }, [fruitVegetableData])

  useEffect(() => {
    let interval = null;
    if (selectedData.length > 0) {
      var currentDate = new Date();
      interval = setInterval(() => {
        setFruitVegetableData(fruitVegetableData.map(data => {
          if (currentDate > selectedData[0].selectedAt) {
            data.selectedAt = undefined
            return data
          } else {
            return data
          }
        } ))
      }, 1000);
    }

    return () => clearInterval(interval)
  }, [selectedData]);


  function onSelected(name: string) {
    setFruitVegetableData(fruitVegetableData.map(data => {
      if (data.name === name) {
        let t = new Date()
        t.setSeconds(t.getSeconds() + 5)
        data.selectedAt = t
        return data
      } else {
        return data
      }
    } ))
  }

  function Column({type}:{type:string}) {
    return (
      <div style={styles.column}>
        <div style={styles.columnHeader}>
          <h3 style={styles.columnTitle}>{type}</h3>
        </div>
        <div style={styles.columnContent}>
          <div style={styles.taskList}>
            {selectedData.filter(d => d.type == type).map((data, index) => (
              <div
                key={index}
                style={styles.taskCard}
              >
                <h4 style={styles.taskTitle}>{data.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div style={styles.container}>
        <div style={styles.boardContainer}>
          <div style={styles.column}>
            <div style={styles.columnHeader}>
              <h3 style={styles.columnTitle}></h3>
            </div>
            <div style={styles.columnContent}>
              <div style={styles.taskList}>
                {unSelectData.map((data, index) => (
                  <button
                    key={index}
                    style={styles.taskCard}
                    onClick={() => onSelected(data.name)}
                  >
                    <h4 style={styles.taskTitle}>{data.name}</h4>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Column type='Fruit'/>
          <Column type='Vegetable'/>
        </div>
    </div>
    </>
  )
}

const styles = {
  container: {
    height: '100vh',
    width: '100%',
    backgroundColor: '#f5f6f8',
    padding: '24px',
  },
  boardContainer: {
    display: 'flex',
    height: '100%',
    gap: '16px',
    overflowX: 'auto',
    // Smoother scrolling for webkit browsers
    WebkitOverflowScrolling: 'touch',
  },
  column: {
    flexShrink: 0,
    width: '320px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  columnHeader: {
    padding: '16px',
    borderBottom: '1px solid #e1e4e8',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  columnTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 600,
    color: '#1a1f36',
  },
  columnContent: {
    padding: '8px',
    flex: 1,
    overflowY: 'auto',
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  taskCard: {
    backgroundColor: '#ffffff',
    padding: '16px',
    borderRadius: '6px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e1e4e8',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
    '&:hover': {
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      transform: 'translateY(-1px)',
    },
  },
  taskTitle: {
    margin: 0,
    fontSize: '14px',
    fontWeight: 500,
    color: '#1a1f36',
    marginBottom: '4px',
  },
};

export default App
