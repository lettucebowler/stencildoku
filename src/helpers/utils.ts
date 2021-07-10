
export function cellLegal(board: number[], row: number, col: number, order: number): boolean {
  const index = getIndex(row, col, order);
  const num = board[index];
  if (num === 0) {
      return true;
  }
  let count = 0;
  // Check rows/columns
  for (let i = 0; i < order * order; i++) {
      if (board[getIndex(i, col, order)] === num) {
          count++;
      }
      if (board[getIndex(row, i, order)] === num) {
          count++;
      }
  }
  // Check block
  const startRow = Math.floor(row / order) * order;
  const startCol = Math.floor(col / order) * order;
  for (let i = 0; i < order; i++) {
      for (let j = 0; j < order; j++) {
          const index = getIndex(startRow + i, startCol + j, order);
          if (board[index] === num) {
              count++;
          }
      }
  }

  return count === 3;
}

export function isInitialHint(board: number[], row: number, col: number, order: number): boolean {
  return board[getIndex(row, col, order)] !== 0;
}

export function boardSuccess(board: number[], order: number): boolean {
  for (let i = 0; i < order * order; i++) {
      for (let j = 0; j < order * order; j++) {
          if (!rowGood(board, i, order)) {
              return false;
          }
          if (!colGood(board, j, order)) {
              return false;
          }
          if (i < order && j < order) {
              if (!blockGood(board, i, j, order)) {
                  return false;
              }
          }
      }
  }
  return true;
}

export function getIndex(row: number, col: number, order: number): number {
  return row * (order * order) + col;
}

const rowGood = (board: number[], row: number, order: number): boolean => {
  const rowSet = new Set();
  for (let i = 0; i < order * order; i++) {
      const index = getIndex(row, i, order);
      const num = board[index];
      if (num !== 0) {
          rowSet.add(num);
      }
  }
  return rowSet.size === order * order;
}

const colGood = (board: number[], col: number, order: number): boolean => {
  const colSet = new Set();
  for (let i = 0; i < order * order; i++) {
      const index = getIndex(i, col, order);
      const num = board[index];
      if (num !== 0) {
          colSet.add(num);
      }
  }
  return colSet.size === order * order;
}

const blockGood = (board: number[], lane: number, trunk: number, order: number): boolean =>  {
  const blockSet = new Set();
  for (let i = lane * order; i < lane * order + order; i++) {
      for (let j = trunk * order; j < trunk * order + order; j++) {
          const index = getIndex(i, j, order);
          const num = board[index];
          if (num !== 0) {
              blockSet.add(num);
          }
      }
  }
  return blockSet.size === order * order;
}