import { Gamebuilder } from '../../../../app/domain/game/Game'
import { expect } from 'chai'

describe('Game set hokm', function () {
  it('should set hakem based on the dealed card', function () {
    var game = new Gamebuilder('name').setGamePlayers({ hakem: '123d' }).build()
    game.table.hokm('khaj', '123d')
    expect(game.table.currentHokm).to.be.equal('khaj')
  })
})

describe('Game set hokm', function () {
  it('should return error if hakem name is not equal to hokm emitter name', function () {
    var game = new Gamebuilder('game').setRoomStatus({ hakem: 'sss13' }).build()
    expect(game.table.hokm.bind(game.table, 'khaj', 'sss14')).throws()
  })
})

describe('Play Card', function () {
  it('should return error if player has a currentCard suit and plays an other suit', function () {
    var game = new Gamebuilder('game')
      .setGamePlayers({
        players: [
          {
            name: 'amir',
            session: '123d',
            socket_id: 's123',
            cards: [
              [4, 'del'],
              [3, 'pik'],
            ],
            connected: true,
          },
          { name: 'amir', session: '123df', socket_id: 's123a', cards: [[4, 'pik']], connected: true },
          { name: 'amir', session: '123dg', socket_id: 's123b', cards: [[4, 'khaj']], connected: true },
          { name: 'amir', session: '123d2', socket_id: 's123c', cards: [[4, 'khesht']], connected: true },
        ],
      })
      .setRoomStatus({ playerTurn: 0 })
      .setTable({ currentCard: 'del' })
      .build()
    expect(game.table.playCard.bind(game.table, [3, 'pik'], '123d')).throws()
  })
})

describe('Play Card', function () {
  it('should return ok if player has a currentCard suit and plays it', function () {
    var game = new Gamebuilder('game')
      .setGamePlayers({
        players: [
          { name: 'amir', session: '123d', socket_id: 's123', cards: [[4, 'del']], connected: true },
          { name: 'amir', session: '123df', socket_id: 's123a', cards: [[4, 'pik']], connected: true },
          { name: 'amir', session: '123dg', socket_id: 's123b', cards: [[4, 'khaj']], connected: true },
          { name: 'amir', session: '123d2', socket_id: 's123c', cards: [[4, 'khesht']], connected: true },
        ],
      })
      .setRoomStatus({ playerTurn: 0 })
      .build()
    game.game_players.initTeams()
    game.table.playCard([4, 'del'], '123d')
    expect(game.table.currentCard).to.be.equal('del')
    expect(game.table.deck[0]).to.be.eql([4, 'del', '123d'])
  })
})
