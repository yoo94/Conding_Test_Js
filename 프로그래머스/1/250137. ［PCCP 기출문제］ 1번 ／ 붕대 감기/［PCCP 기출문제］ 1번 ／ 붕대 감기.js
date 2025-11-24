function solution(bandage, health, attacks) {
    const max_hp = health;
    const bandage_time = bandage[0]
    const plusHp = bandage[1]
    const continueHp = bandage[2]
    
    let continue_bandage = 0;
    let time = attacks[attacks.length - 1][0]+1
    let attack_now = false;
    for(let current = 0; current < time; current++){
        for(const [at,ad] of attacks){
            if(current === at){
                continue_bandage = 0;
                health -=  ad;
                console.log("공격시간",current,"공격당함 전체체력:",health);
                if(health <= 0) return -1;
                attack_now = true;
            }
        }
        console.log(attack_now)
        if(!attack_now){
            continue_bandage ++;
            if(max_hp > health + plusHp ) {
                health += plusHp;
                if(continue_bandage >= bandage_time) {
                    health +=continueHp;
                    continue_bandage = 0;
                }
            }
            else health = max_hp;
            
            console.log("회복시간",current,"전체체력:",health);
        }
        attack_now = false
        if(health <= 0) return -1;
    }
    return health;
}