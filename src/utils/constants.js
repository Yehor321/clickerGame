import {
  faPercent,
  faSkiing,
  faMeteor,
  faRadiation,
  faHeart, faDna,
  faHeartbeat,
  faSnowplow,
  faShippingFast,
  //====
  faCat,
  faCrow,
  faGhost,
  faSkullCrossbones,
  faDog,
  faDove,
  faDragon,
  faFish,
  faFrog,
  faHorse,
  faOtter,
  faBaby,
  faBug,
  faDizzy,
  faFemale,
  faFlushed,
  faFrown,
  faGrimace,
  faGrin,
  faGrinBeam,
  faGrinHearts,
  faGrinTongueSquint,
  faGrinTongueWink,
  faSpider,
  faBlind,
  faAccessibleIcon,
  faAmbulance,
  faAllergies,
  faRobot,
  faAngry,
  faBabyCarriage,
  faBed,
  faBiking,
  faCarrot,
  faCloudSun,
  faFighterJet,
  faSnowman,
  faPizzaSlice
} from '@fortawesome/free-solid-svg-icons';
import store from '../redux/store/store';
import { setResultTable } from '../redux/actions/playersActions';

export const bafs = [
  {
    id: 0,
    kind: "health",
    name: "+ 1 HEALTH",
    icon: faHeart
  },
  {
    id: 1,
    kind: "health",
    name: "- 1 HEALTH",
    icon: faHeartbeat
  },
  {
    id: 2,
    kind: "atack",
    name: "Тебя укусил паук, и ты стал человеком-пауком. Твоя получил +2 к силе!",
    icon: faSpider
  },
  {
    id: 3,
    kind: "percent",
    name: "Ты немного ослеп, и по этому сбился с пути, по этому путь который ты пройдешь увеличился на 7%.",
    icon: faBlind
  },
  {
    id: 4,
    kind: "percent",
    name: "Ух ты! Профессор с людей Х согласился тебе помочь и подбросил тебя ближе к выходу на 5%",
    icon: faAccessibleIcon
  },
  {
    id: 5,
    kind: "health",
    name: "Мимо проезжала скорая, и подкинуло одно лишнее сердечко, теперь у тебя +1 сердце",
    icon: faAmbulance
  },
  {
    id: 6,
    kind: "atack",
    name: "Ты в баре выпил какую-то жижу и теперь тебе поплохело, твоя сила упала на 3",
    icon: faAllergies
  },
  {
    id: 7,
    kind: "speed",
    name: "Следующий раз полоса дороги будет убывать так же медленно, как работает адроид, то-есть очень медленно",
    icon: faRobot
  },
  {
    id: 8,
    kind: "atack",
    name: "Ты нарвался на злого деда, и он тебе надавал по коленям своим костылем, теперь ты медленно побежишь",
    icon: faAngry
  },
  {
    id: 9,
    kind: "percent",
    name: "На твоем пути появилась мамочка с коляской, тебе придется ее оббежать, это +6% к твоей дороге",
    icon: faBabyCarriage
  },
  {
    id: 10,
    kind: "atack",
    name: "Ты хорошо выспался и по этому сильнее, +2 к силе",
    icon: faBed
  },
  {
    id: 11,
    kind: "percent",
    name: "Пока ты бежал, тебе догнал какой-то байкер и подбросил, -5% к дороге",
    icon: faBiking
  },
  {
    id: 12,
    kind: "health",
    name: "Ля какая вкусная и полезная морковочка, она добавила тебе +2 жизни",
    icon: faCarrot
  },
  {
    id: 13,
    kind: "percent",
    name: "Черная кошка перебежала тебе дорогу, а ты суеверный, придется оббегать +10% к дороге",
    icon: faCat
  },
  {
    id: 14,
    kind: "atack",
    name: "Вышло солнышко, зарядило тебя силой, +3к силе",
    icon: faCloudSun
  },
  {
    id: 15,
    kind: "health",
    name: "Тебя сбил истрибитель, упс... -1 жизнь",
    icon: faFighterJet
  },
  {
    id: 16,
    kind: "percent",
    name: "Ты встретил доброго Сергея, он подсказал тебе как сократить дорогу. -10% к дороге",
    icon: faSnowman
  },
  {
    id: 17,
    kind: "health",
    name: "На тебя упал метеорит. -1 жизнь",
    icon: faMeteor
  },
  {
    id: 18,
    kind: "atack",
    name: "Ммм.. пица! Скував ее ты стал сильнее!",
    icon: faPizzaSlice
  },
  {
    id: 19,
    kind: "atack",
    name: "Ты искупался в чернобыльской речке, и у тебя выросло еще 3 ноги, теперь ты быстрее бегаешь",
    icon: faRadiation
  },
]

export const gameOver = async (livePlayersNumber) => {
  let newPlayersArr = store.getState().players.gameSchema.players;
  let resultSchema = [];

  newPlayersArr.map((player, index) => {
    let obj = {};
    obj.playerId = player.playerId;
    obj.hp = player.health;
    obj.icon = player.icon;
    obj.name = player.name;
    obj.gameHistory = player.gameHistory,
      obj.gs = 0,
      resultSchema.push(obj)
  })

  resultSchema = resultSchema.map(item => {
    item.gs += item.hp * 1000;
    item.gameHistory.forEach((round) => {
      item.gs += round.clicks > 0 ? (round.clicks / -10) : -30
    })
    return item
  })

  await store.dispatch(setResultTable(resultSchema));
};

export const genereateRandomNumber = (from, to) => {
  return Math.round(Math.random() * (from + to));
};

export const iconsArr = [
  faCat,
  faCrow,
  faGhost,
  faSkullCrossbones,
  faSpider,
  faDog,
  faDove,
  faDragon,
  faFish,
  faFrog,
  faHorse,
  faOtter,
  faAngry,
  faBaby,
  faBlind,
  faBug,
  faDizzy,
  faFemale,
  faFlushed,
  faFrown,
  faGrimace,
  faGrin,
  faGrinBeam,
  faGrinHearts,
  faGrinTongueSquint,
  faGrinTongueWink
]