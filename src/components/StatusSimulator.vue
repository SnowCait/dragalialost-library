<template>
    <main>
        <h1>ステータスシミュレーター</h1>

        <section class="equipments">
            <ul>
                <li>
                    <img class="adventurer" src="@/assets/img/adventurer/110043_02_r05.png" alt="キャラクター" />
                    <div>Lv </div>
                    <div>マナサ</div>
                    <div>レアリティ</div>
                    <div>EX</div>
                </li>

                <li>
                    <img src="" alt="武器" />
                    <div>Lv</div>
                    <div>上限解放</div>
                </li>

                <li>
                    <img src="" alt="護符1" />
                    <div>Lv</div>
                    <div>上限解放</div>
                </li>

                <li>
                    <img src="" alt="護符2" />
                    <div>Lv</div>
                    <div>上限解放</div>
                </li>

                <li>
                    <img src="@/assets/img/dragon/210001_01.png" alt="ドラゴン" />
                    <div>Lv</div>
                    <div>上限解放</div>
                    <div>信頼度 {{dragonBond}}</div>
                </li>
            </ul>

            <div>
                <h3>施設</h3>
            </div>
        </section>

        <section class="dragons">
            <ul>
                <li v-for="dragon in dragons" :key="dragon.BaseId"><img :src="dragon.Image" :alt="dragon.Name" /></li>
            </ul>
        </section>

        <section class="status">
            <h2>ステータス</h2>
            <p>( ) 内は個別に見たときのステータス。</p>

            <table>
                <tr>
                    <td></td>
                    <td class="status-value">HP</td>
                    <td class="status-value">攻撃力</td>
                    <td class="status-value">戦力</td>
                </tr>
                <tr>
                    <td>キャラクター</td>
                    <td>{{adventurerHp}}<br>({{adventurerHp + castleAdventurerHp}})</td>
                    <td>{{adventurerStr}}<br>({{adventurerStr + castleAdventurerStr}})</td>
                    <td>{{adventurerMight}}<br>({{adventurerTotalMight}})</td>
                </tr>
                <tr>
                    <td>武器</td>
                    <td>+{{weaponTotalHp}}<br>({{weaponHp}})</td>
                    <td>+{{weaponTotalStr}}<br>({{weaponStr}})</td>
                    <td>+{{weaponTotalMight}}<br>({{weaponMight}})</td>
                </tr>
                <tr>
                    <td>竜輝の護符</td>
                    <td>+{{wyrmprintHp}}</td>
                    <td>+{{wyrmprintStr}}</td>
                    <td>+{{wyrmprintMight}}</td>
                </tr>
                <tr>
                    <td>ドラゴン</td>
                    <td>+{{dragonTotalHp}}<br>({{dragonHp}})<br>({{dragonHp + castleDragonHp}})</td>
                    <td>+{{dragonTotalStr}}<br>({{dragonStr}})<br>({{dragonStr + castleDragonStr}})</td>
                    <td>+{{dragonTotalMight}}<br>({{dragonMight}})<br>({{dragonCastleMight}})</td>
                </tr>
                <tr>
                    <td>アビリティ</td>
                    <td>+{{abilityTotalHp}}</td>
                    <td>+{{abilityTotalStr}}</td>
                    <td>+{{abilityTotalMight}}</td>
                </tr>
                <tr>
                    <td>聖城</td>
                    <td>+{{castconstotalHp}}</td>
                    <td>+{{castconstotalStr}}</td>
                    <td>+{{castconstotalMight}}</td>
                </tr>
                <tr>
                    <td>合計</td>
                    <td>{{sumHp}}</td>
                    <td>{{sumStr}}</td>
                    <td>{{sumMight}}</td>
                </tr>
            </table>
        </section>
    </main>
</template>

<script>
import dragons from '../assets/json/Dragons.json';

dragons.sort((a, b) => {
    // できれば属性→レアリティ順にしたい
    // if (a.ElementalType == b.ElementalType) {
    //     return b.Rarity - a.Rarity;  // 降順
    // } else {
    //     return a.ElementalType - b.ElementalType;  // 昇順
    // }
    return a.BaseId - b.BaseId;
});
console.log(dragons);
dragons.forEach(dragon => {
    dragon.Image = require('@/assets/img/dragon/' + dragon.BaseId + '_01.png');
});

export default {
    data () {
        // キャラクター
        /// 5★ Max + Mana Circle Node Stats + Mana Circle Bonus
        const adventurerHp = 805;
        const adventurerStr = 469;
        const skillMight = 300 + 200;
        const forceStrikeMight = 120;
        const coAbilityMight = 320;
        const abilityMight = 100 + 100 + 100;
        const adventurerDefense = 8;
        /// Max 5★ HP + Max 5★ Str + Total Skill Might + Force Strike Lv. 2 Might + Co-Ability Might + Total Ability Might
        const adventurerMight = adventurerHp + adventurerStr + skillMight + forceStrikeMight + coAbilityMight + abilityMight;
        const castleAdventurerHpRate = 0.20;
        const castleAdventurerStrRate = 0.19;
        const castleWeaponHpRate = 0.23;
        const castleWeaponStrRate = 0.23;
        const castleAdventurerHp = Math.ceil(adventurerHp * (castleAdventurerHpRate + castleWeaponHpRate));
        const castleAdventurerStr = Math.ceil(adventurerStr * (castleAdventurerStrRate + castleWeaponStrRate));
        const adventurerTotalMight = adventurerMight + castleAdventurerHp + castleAdventurerStr;

        // 武器
        const weaponHp = 178;
        const weaponStr = 487;
        const weaponSkillMight = 100;
        const weaponAbilityMight = 0;
        const weaponMight = weaponHp + weaponStr + weaponSkillMight + weaponAbilityMight;
        const weaponBonusRate = 0.5;  // 同属性は 0.5, 他は 0
        const weaponBonusHp = Math.ceil(weaponHp * weaponBonusRate);
        const weaponBonusStr = Math.ceil(weaponStr * weaponBonusRate);
        const weaponTotalHp = weaponHp + weaponBonusHp;
        const weaponTotalStr = weaponStr + weaponBonusStr;
        const weaponTotalMight = weaponMight + weaponBonusHp + weaponBonusStr;

        // 竜輝の護符
        const wyrmprint1Hp = 176;
        const wyrmprint1Str = 65;
        const wyrmprint1AbilityMight = 100 + 80;
        const wyrmprint1Might = wyrmprint1Hp + wyrmprint1Str + wyrmprint1AbilityMight;
        const wyrmprint1AbilityHpRate = 0;
        const wyrmprint1AbilityStrRate = 0.15;
        const wyrmprint2Hp = 183;
        const wyrmprint2Str = 57;
        const wyrmprint2AbilityHpRate = 0;
        const wyrmprint2AbilityStrRate = 0.13;
        const wyrmprint2AbilityMight = 100 + 80;
        const wyrmprint2Might = wyrmprint2Hp + wyrmprint2Str + wyrmprint2AbilityMight;
        const wyrmprintHp = wyrmprint1Hp + wyrmprint2Hp;
        const wyrmprintStr = wyrmprint1Str + wyrmprint2Str;
        const wyrmprintMight = wyrmprint1Might + wyrmprint2Might;

        // ドラゴン
        const dragonBond = 30;
        const dragonHp = 369;
        const dragonStr = 127;
        const dragonSkillMight = 100;
        const dragonAbilityMight = 100;
        const dragonAbilityHpRate = 0;
        const dragonAbilityStrRate = 0.6;
        const dragonBondMight = dragonBond * 10;
        // Max HP + Max Str + Lv. 2 Skill Might + Lv. 2 Ability Might + Lv. 30 Bond (* Elemental Matching Bonus)
        const dragonMight = dragonHp + dragonStr + dragonSkillMight + dragonAbilityMight + dragonBondMight;
        const castleDragonHpRate = 0.08;
        const castleDragonStrRate = 0.08;
        const castleDragonHp = Math.ceil(dragonHp * castleDragonHpRate);
        const castleDragonStr = Math.ceil(dragonStr * castleDragonStrRate);
        const dragonCastleMight = dragonMight + castleDragonHp + castleDragonStr;
        const dragonBonusRate = 0.5;  // 同属性は 0.5, 他は 0
        const dragonBonusHp = Math.ceil(dragonHp * dragonBonusRate);
        const dragonBonusStr = Math.ceil(dragonStr * dragonBonusRate);
        const dragonTotalHp = dragonHp + dragonBonusHp;
        const dragonTotalStr = dragonStr + dragonBonusStr;
        const dragonTotalMight = dragonMight + dragonBonusHp + dragonBonusStr;

        // 聖城
        const castconstotalHp = castleAdventurerHp + castleDragonHp;
        const castconstotalStr = castleAdventurerStr + castleDragonStr;
        const castconstotalMight = castconstotalHp + castconstotalStr;

        // アビリティ
        const totalHp = adventurerHp + weaponTotalHp + wyrmprintHp + dragonTotalHp + castconstotalHp;
        const totalStr = adventurerStr + weaponTotalStr + wyrmprintStr + dragonTotalStr + castconstotalStr;
        const wyrmprintAbilityHp = Math.ceil(totalHp * (wyrmprint1AbilityHpRate + wyrmprint2AbilityHpRate));  // 本来上限値があるはずだが現状反映されていない
        const wyrmprintAbilityStr = Math.ceil(totalStr * (wyrmprint1AbilityStrRate + wyrmprint2AbilityStrRate));
        const dragonAbilityHp = Math.ceil((totalHp) * dragonAbilityHpRate);
        const dragonAbilityStr = Math.ceil((totalStr) * dragonAbilityStrRate);
        const abilityTotalHp = wyrmprintAbilityHp + dragonAbilityHp;
        const abilityTotalStr = wyrmprintAbilityStr + dragonAbilityStr;
        const abilityTotalMight = 0;  // アビリティUP分は戦力としてカウントしない

        // 合計
        const sumHp = adventurerHp + weaponTotalHp + wyrmprintHp + dragonTotalHp + abilityTotalHp + castconstotalHp;
        const sumStr = adventurerStr + weaponTotalStr + wyrmprintStr + dragonTotalStr + abilityTotalStr + castconstotalStr;
        const sumMight = adventurerMight + weaponTotalMight + wyrmprintMight + dragonTotalMight + abilityTotalMight + castconstotalMight;

        return {
            // キャラクター
            adventurerHp,
            adventurerStr,
            adventurerMight,
            castleAdventurerHp,
            castleAdventurerStr,
            adventurerTotalMight,
            
            // 武器
            weaponHp,
            weaponStr,
            weaponMight,
            weaponTotalHp,
            weaponTotalStr,
            weaponTotalMight,

            // 竜輝の護符
            wyrmprintHp,
            wyrmprintStr,
            wyrmprintMight,

            // ドラゴン
            dragons,
            dragonHp,
            dragonStr,
            dragonMight,
            dragonBond,
            castleDragonHp,
            castleDragonStr,
            dragonCastleMight,
            dragonBonusHp,
            dragonBonusStr,
            dragonTotalHp,
            dragonTotalStr,
            dragonTotalMight,

            // 聖城
            castconstotalHp,
            castconstotalStr,
            castconstotalMight,

            // アビリティ
            abilityTotalHp,
            abilityTotalStr,
            abilityTotalMight,

            // 合計
            sumHp,
            sumStr,
            sumMight
        }
    }
}
</script>


<style>
    .equipments > ul {
        list-style: none;
        display: flex;
        padding: 0;
        margin: 0 auto;
        max-width: 600px;
    }
    .equipments > ul > li {
        width: 20%;
    }
    .equipments > ul > li > img {
        width: 80px;
        height: 80px;
    }
    .dragons > ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin: 0 auto;
        max-width: 600px;
    }
    .dragons > ul > li > img {
        width: 48px;
        height: 48px;
    }
    .status > table {
        margin: 0 auto;
    }
    .status-value {
        width: 80px;
    }
</style>

