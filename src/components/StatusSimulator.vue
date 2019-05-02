<template>
    <main>
        <h1>ステータスシミュレーター</h1>

        <section class="equipments">
            <h2>装備</h2>

            <h3>キャラ</h3>
            <img class="adventurer" src="@/assets/img/adventurer/110043_02_r05.png" />
            <div>Lv </div>
            <div>マナサ</div>
            <div>レアリティ</div>
            <div>EX</div>

            <h3>武器</h3>
            <img src="" />
            <div>Lv</div>
            <div>上限解放</div>

            <h3>護符1</h3>
            <img src="" />
            <div>Lv</div>
            <div>上限解放</div>

            <h3>護符2</h3>
            <img src="" />
            <div>Lv</div>
            <div>上限解放</div>

            <h3>ドラゴン</h3>
            <img src="" />
            <div>Lv</div>
            <div>上限解放</div>
            <div>信頼度</div>

            <h3>施設</h3>
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
        const dragonHp = 369;
        const dragonStr = 127;
        const dragonSkillMight = 100;
        const dragonAbilityMight = 100;
        const dragonAbilityHpRate = 0;
        const dragonAbilityStrRate = 0.6;
        const bondMight = 300;  // Lv * 10
        // Max HP + Max Str + Lv. 2 Skill Might + Lv. 2 Ability Might + Lv. 30 Bond (* Elemental Matching Bonus)
        const dragonMight = dragonHp + dragonStr + dragonSkillMight + dragonAbilityMight + bondMight;
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
            dragonHp,
            dragonStr,
            dragonMight,
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
    img.adventurer {
        width: 100px;
        height: 100px;
    }
    .status > table {
        margin: 0 auto;
    }
    .status-value {
        width: 80px;
    }
</style>

