NORMAL_STATE = 'normal';
HARD_STATE = 'hard';

BOSS_LEVELS = {
    1:{
        normal: {
            enemyBreak: 2 * 1000,
            coinBreak: 500,
            type: {
                RED: 0,
                BLUE: 1
            }
        },
        hard: {
            enemyBreak: 1000,
            coinBreak: 2 * 1000,
            type: {
                RED: .25,
                BLUE: .75
            }
        }
    },


    2: {
        normal: {
            enemyBreak: 1000,
            coinBreak: 500,
            type: {
                RED: .25,
                BLUE: .75
            }
        },
        hard: {
            enemyBreak: 500,
            coinBreak: 2 * 1000,
            type: {
                RED: .30,
                BLUE: .70
            }
        }
    }
};
