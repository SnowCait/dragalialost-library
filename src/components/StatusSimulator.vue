<template>
    <main>
        <h1>ステータスシミュレーター</h1>

        <section class="equipment">
            <ul>
                <li v-on:click="showAdventurerList = !showAdventurerList">
                    <img :src="selectedAdventurer.Image" :alt="selectedAdventurer.Name" />
                    <div>Lv{{adventurerLv}}</div>
                    <div>マナサ 50</div>
                    <div>レア {{selectedAdventurer.Rarity}}</div>
                    <div>EX</div>
                </li>

                <li v-on:click="showWeaponList = !showWeaponList">
                    <img :src="selectedWeapon.Image" :alt="selectedWeapon.Name" />
                    <div>Lv{{weaponLv}}</div>
                    <div>完凸<input type="checkbox" v-model="weaponUnbind" /></div>
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

                <li v-on:click="showDragonList = !showDragonList">
                    <img :src="selectedDragon.Image" :alt="selectedDragon.Name" />
                    <div>Lv{{dragonLv}}</div>
                    <div>完凸<input type="checkbox" v-model="dragonUnbind" /></div>
                    <div>信頼度 {{dragonBond}}</div>
                </li>
            </ul>

            <div>
                <h3>施設</h3>
                <div>属性{{castleAdventurerHpRate * 100}}%/{{castleAdventurerStrRate * 100}}%</div>
                <div>武器{{castleWeaponHpRate * 100}}%/{{castleWeaponHpRate * 100}}%</div>
                <div>ドラゴン{{castleDragonHpRate * 100}}%/{{castleDragonHpRate * 100}}%</div>
            </div>
        </section>

        <section class="adventurers select-list" v-show="showAdventurerList">
            <ul>
                <li v-for="adventurer in adventurersMaster" :key="adventurer.BaseId" v-on:click="selectAdventurer(adventurer)">
                    <img :src="adventurer.Image" :alt="adventurer.Name" />
                </li>
            </ul>
        </section>

        <section class="weapons select-list" v-show="showWeaponList">
            <ul>
                <li v-for="weapon in selectWeaponList" :key="weapon.Id" v-on:click="selectWeapon(weapon)">
                    <img :src="weapon.Image" :alt="weapon.Name" />
                </li>
            </ul>
        </section>

        <section class="dragons select-list" v-show="showDragonList">
            <ul>
                <li v-for="dragon in dragonsMaster" :key="dragon.BaseId" v-on:click="selectDragon(dragon)">
                    <img :src="dragon.Image" :alt="dragon.Name" />
                </li>
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
                    <td>{{adventurerHp}}</td>
                    <td>{{adventurerStr}}</td>
                    <td>{{adventurerMight}}</td>
                </tr>
                <tr>
                    <td>武器</td>
                    <td>+{{weaponTotalHp}}</td>
                    <td>+{{weaponTotalStr}}</td>
                    <td>+{{weaponTotalMight}}</td>
                </tr>
                <tr>
                    <td>竜輝の護符</td>
                    <td>+{{wyrmprintHp}}</td>
                    <td>+{{wyrmprintStr}}</td>
                    <td>+{{wyrmprintMight}}</td>
                </tr>
                <tr>
                    <td>ドラゴン</td>
                    <td>+{{dragonTotalHp}}</td>
                    <td>+{{dragonTotalStr}}</td>
                    <td>+{{dragonTotalMight}}</td>
                </tr>
                <tr>
                    <td>アビリティ</td>
                    <td>+{{abilityTotalHp}}</td>
                    <td>+{{abilityTotalStr}}</td>
                    <td>+{{abilityTotalMight}}</td>
                </tr>
                <tr>
                    <td>聖城</td>
                    <td>+{{castleTotalHp}}</td>
                    <td>+{{castleTotalStr}}</td>
                    <td>+{{castleTotalMight}}</td>
                </tr>
                <tr>
                    <td>合計</td>
                    <td>{{sumHp}}</td>
                    <td>{{sumStr}}</td>
                    <td>{{sumMight}}</td>
                </tr>
            </table>

            <h3>キャラクター</h3>
            <table>
                <tr>
                    <td></td>
                    <td class="status-value">HP</td>
                    <td class="status-value">攻撃力</td>
                    <td class="status-value">戦力</td>
                </tr>
                <tr>
                    <td>キャラクター</td>
                    <td>{{adventurerHp}}</td>
                    <td>{{adventurerStr}}</td>
                    <td>{{adventurerMight}}</td>
                </tr>
                <tr>
                    <td>アビリティ</td>
                    <td>+0</td>
                    <td>+0</td>
                    <td>+0</td>
                </tr>
                <tr>
                    <td>聖城</td>
                    <td>+{{castleAdventurerHp}}</td>
                    <td>+{{castleAdventurerStr}}</td>
                    <td>+{{castleAdventurerHp + castleAdventurerStr}}</td>
                </tr>
                <tr>
                    <td>合計</td>
                    <td>{{adventurerHp + castleAdventurerHp}}</td>
                    <td>{{adventurerStr + castleAdventurerStr}}</td>
                    <td>{{adventurerTotalMight}}</td>
                </tr>
            </table>

            <h3>武器</h3>
            <table>
                <tr>
                    <td></td>
                    <td class="status-value">HP</td>
                    <td class="status-value">攻撃力</td>
                    <td class="status-value">戦力</td>
                </tr>
                <tr>
                    <td>武器</td>
                    <td>{{weaponHp}}</td>
                    <td>{{weaponStr}}</td>
                    <td>{{weaponMight}}</td>
                </tr>
            </table>

            <h3>ドラゴン</h3>
            <table>
                <tr>
                    <td></td>
                    <td class="status-value">HP</td>
                    <td class="status-value">攻撃力</td>
                    <td class="status-value">戦力</td>
                </tr>
                <tr>
                    <td>ドラゴン</td>
                    <td>{{dragonHp}}</td>
                    <td>{{dragonStr}}</td>
                    <td>{{dragonMight}}</td>
                </tr>
                <tr>
                    <td>聖城</td>
                    <td>+{{castleDragonHp}}</td>
                    <td>+{{castleDragonStr}}</td>
                    <td>+{{castleDragonHp + castleDragonStr}}</td>
                </tr>
                <tr>
                    <td>合計</td>
                    <td>{{dragonHp + castleDragonHp}}</td>
                    <td>{{dragonStr + castleDragonStr}}</td>
                    <td>{{dragonCastleMight}}</td>
                </tr>
            </table>
        </section>
    </main>
</template>

<script>
import adventurersMaster from '../assets/json/Adventurers.json';
import weaponsMaster from '../assets/json/Weapons.json';
import dragonsMaster from '../assets/json/Dragons.json';
import coAbilitiesMaster from '../assets/json/CoAbilities.json';
const weaponLevelsMaster = {
    5: 100,
    4: 70,
    3: 40,
    2: 30,
    1: 1
};
const dragonLevelsMaster = {
    5: 100,
    4: 80,
    3: 60
};

adventurersMaster.sort((a, b) => {
    // 属性順、レアリティ降順、同レアリティ同士は未定義
    if (a.ElementalTypeId == b.ElementalTypeId) {
        return b.Rarity - a.Rarity;  // 降順
    } else {
        return a.ElementalTypeId - b.ElementalTypeId;  // 昇順
    }
});
adventurersMaster.forEach(adventurer => {
    adventurer.Image = require('@/assets/img/adventurer/' + adventurer.Id + '_' + ('0' + adventurer.VariationId).slice(-2) + '_r' + ('0' + adventurer.Rarity).slice(-2) + '.png');
});

weaponsMaster.forEach(weapon => {
    weapon.Image = require('@/assets/img/weapon/' + weapon.BaseId + '_01_' + weapon.FormId + '.png');
});

dragonsMaster.sort((a, b) => {
    // 属性順、レアリティ降順、同レアリティ同士は未定義
    if (a.ElementalTypeId == b.ElementalTypeId) {
        return b.Rarity - a.Rarity;  // 降順
    } else {
        return a.ElementalTypeId - b.ElementalTypeId;  // 昇順
    }
});
dragonsMaster.forEach(dragon => {
    dragon.Image = require('@/assets/img/dragon/' + dragon.BaseId + '_01.png');
});

export default {
    methods: {
        selectAdventurer: function (adventurer) {
            const beforeAdventurer = this.selectedAdventurer;
            this.selectedAdventurer = adventurer;
            this.showAdventurerList = false;
            console.log(`select adventurer: [${adventurer.Id}] ${adventurer.Name}`);

            if (beforeAdventurer.WeaponTypeId != adventurer.WeaponTypeId) {
                this.selectWeapon(this.weaponsMaster.filter(weapon => {
                    return weapon.TypeId == adventurer.WeaponTypeId
                        && weapon.ElementalTypeId == adventurer.ElementalTypeId
                        && weapon.Rarity == 5
                        && weapon.Skill != 0;
                }).shift());
            }
        },
        selectWeapon: function (weapon) {
            this.selectedWeapon = weapon;
            this.weaponLv = this.weaponLevelsMaster[weapon.Rarity];
            this.weaponUnbind = true;
            this.showWeaponList = false;
            console.log(`select weapon: [${weapon.Id}] ${weapon.WeaponName}`);
        },
        selectDragon: function (dragon) {
            this.selectedDragon = dragon;
            this.showDragonList = false;
            console.log(`select dragon: [${dragon.BaseId}] ${dragon.Name}`);
        }
    },
    data () {
        return {
            // キャラクター
            adventurersMaster,
            coAbilitiesMaster,
            selectedAdventurer: adventurersMaster.filter(adventurer => {
                return adventurer.Id == 110043;
            })[0],

            // 武器
            weaponsMaster,
            weaponLevelsMaster,
            selectedWeapon: weaponsMaster.filter(weapon => {
                return weapon.Id == 30850101;
            })[0],
            weaponLv: 100,
            weaponUnbind: true,
            
            // ドラゴン
            dragonsMaster,
            dragonLevelsMaster,
            selectedDragon: dragonsMaster.filter(dragon => {
                return dragon.Id == 20050104;
            })[0],

            // UI
            showAdventurerList: false,
            showWeaponList: false,
            showDragonList: false
        }
    },
    computed: {
        // 選択リスト
        selectWeaponList: function () {
            return this.weaponsMaster.filter(weapon => {
                return weapon.TypeId == this.selectedAdventurer.WeaponTypeId;
            }).sort((a, b) => {
                if (a.Rarity == b.Rarity) {
                    return a.ElementalTypeId - b.ElementalTypeId;
                } else {
                    return b.Rarity - a.Rarity;
                }
            });
        },

        // 聖城
        castleAdventurerHpRate: function () {
            return 0.20;
        },
        castleAdventurerStrRate: function () {
            return 0.19;
        },
        castleWeaponHpRate: function () {
            return 0.23;
        },
        castleWeaponStrRate: function () {
            return 0.23;
        },
        castleDragonHpRate: function () {
            return 0.085;
        },
        castleDragonStrRate: function () {
            return 0.085;
        },

        // キャラクター
        adventurerLv: function () {
            return 80;
        },
        adventurerRarity: function () {
            return 5;
        },
        adventurerHp: function () {
            // 5★ Max + Mana Circle Node Stats + Mana Circle Bonus
            return this.selectedAdventurer.MaxHp
                 + this.selectedAdventurer.PlusHp0
                 + this.selectedAdventurer.PlusHp1
                 + this.selectedAdventurer.PlusHp2
                 + this.selectedAdventurer.PlusHp3
                 + this.selectedAdventurer.PlusHp4
                 + this.selectedAdventurer.McFullBonusHp5;
        },
        adventurerStr: function () {
            // 5★ Max + Mana Circle Node Stats + Mana Circle Bonus
            return this.selectedAdventurer.MaxAtk
                 + this.selectedAdventurer.PlusAtk0
                 + this.selectedAdventurer.PlusAtk1
                 + this.selectedAdventurer.PlusAtk2
                 + this.selectedAdventurer.PlusAtk3
                 + this.selectedAdventurer.PlusAtk4
                 + this.selectedAdventurer.McFullBonusAtk5;
        },
        skillMight: function () {
            return 300 + 200;
        },
        forceStrikeMight: function () {
            return 120;
        },
        coAbilityMight: function () {
            // TODO: Lvで変動させる
            return this.coAbilitiesMaster.filter(ability => {
                return ability.Id == this.selectedAdventurer.ExAbilityData5;
            }).shift().PartyPowerWeight;
        },
        abilityMight: function () {
            return 100 + 100 + 100;
        },
        adventurerMight: function () {
            // Max 5★ HP + Max 5★ Str + Total Skill Might + Force Strike Lv. 2 Might + Co-Ability Might + Total Ability Might
            return this.adventurerHp + this.adventurerStr + this.skillMight + this.forceStrikeMight + this.coAbilityMight + this.abilityMight;
        },
        castleAdventurerHp: function () {
            return Math.ceil(this.adventurerHp * (this.castleAdventurerHpRate + this.castleWeaponHpRate));
        },
        castleAdventurerStr: function () {
            return Math.ceil(this.adventurerStr * (this.castleAdventurerStrRate + this.castleWeaponStrRate));
        },
        adventurerTotalMight: function () {
            return this.adventurerMight + this.castleAdventurerHp + this.castleAdventurerStr;
        },

        // 武器
        weaponHp: function () {
            return this.selectedWeapon.MaxHp;
        },
        weaponStr: function () {
            return this.selectedWeapon.MaxAtk;
        },
        weaponSkillMight: function () {
            return 100;
        },
        weaponAbilityMight: function () {
            return 0;
        },
        weaponMight: function () {
            return this.weaponHp + this.weaponStr + this.weaponSkillMight + this.weaponAbilityMight;
        },
        weaponBonusRate: function () {
            // 同属性は 0.5, 他は 0
            return (this.selectedWeapon.ElementalTypeId == this.selectedAdventurer.ElementalTypeId) ? 0.5 : 0;
        },
        weaponBonusHp: function () {
            return Math.ceil(this.weaponHp * this.weaponBonusRate);
        },
        weaponBonusStr: function () {
            return Math.ceil(this.weaponStr * this.weaponBonusRate);
        },
        weaponTotalHp: function () {
            return this.weaponHp + this.weaponBonusHp;
        },
        weaponTotalStr: function () {
            return this.weaponStr + this.weaponBonusStr;
        },
        weaponTotalMight: function () {
            return this.weaponMight + this.weaponBonusHp + this.weaponBonusStr;
        },

        // 竜輝の護符
        wyrmprint1Hp: function () {
            return 176;
        },
        wyrmprint1Str: function () {
            return 65;
        },
        wyrmprint1AbilityMight: function () {
            return 100 + 80;
        },
        wyrmprint1AbilityHpRate: function () {
            return 0;
        },
        wyrmprint1AbilityStrRate: function () {
            return 0.15;
        },
        wyrmprint2Hp: function () {
            return 183;
        },
        wyrmprint2Str: function () {
            return 57;
        },
        wyrmprint2AbilityMight: function () {
            return 100 + 80;
        },
        wyrmprint2AbilityHpRate: function () {
            return 0;
        },
        wyrmprint2AbilityStrRate: function () {
            return 0.13;
        },
        wyrmprint1Might: function () {
            return this.wyrmprint1Hp + this.wyrmprint1Str + this.wyrmprint1AbilityMight;
        },
        wyrmprint2Might: function () {
            return this.wyrmprint2Hp + this.wyrmprint2Str + this.wyrmprint2AbilityMight;
        },
        wyrmprintHp: function () {
            return this.wyrmprint1Hp + this.wyrmprint2Hp;
        },
        wyrmprintStr: function () {
            return this.wyrmprint1Str + this.wyrmprint2Str;
        },
        wyrmprintMight: function () {
            return this.wyrmprint1Might + this.wyrmprint2Might;
        },

        // ドラゴン
        dragonLv: function () {
            return this.dragonLevelsMaster[this.selectedDragon.Rarity];  // とりあえずMAX
        },
        dragonUnbind: function () {
            return true;  // とりあえず固定
        },
        dragonBond: function () {
            return 30;  // とりあえず固定
        },
        dragonHp: function () {
            return this.selectedDragon.MaxHp;
        },
        dragonStr: function () {
            return this.selectedDragon.MaxAtk;
        },
        dragonAbilityHpRate: function () {
            // ドラゴンのスキルマスターなさそうだから自分で定義する？
            return 0;
        },
        dragonAbilityStrRate: function () {
            // ドラゴンのスキルマスターなさそうだから自分で定義する？
            return 0.6;
        },
        dragonSkillMight: function () {
            // ドラゴンのスキルマスターなさそうだから自分で定義する？
            return 100;
        },
        dragonAbilityMight: function () {
            // ドラゴンのスキルマスターなさそうだから自分で定義する？
            return 100;
        },
        castleDragonHp: function () {
            console.log(this.dragonHp, this.castleDragonHpRate);
            return Math.ceil(this.dragonHp * this.castleDragonHpRate);
        },
        castleDragonStr: function () {
            return Math.ceil(this.dragonStr * this.castleDragonStrRate);
        },
        dragonBondMight: function () {
            return this.dragonBond * 10;
        },
        dragonMight: function () {
            // Max HP + Max Str + Lv. 2 Skill Might + Lv. 2 Ability Might + Lv. 30 Bond (* Elemental Matching Bonus)
            return this.dragonHp + this.dragonStr + this.dragonSkillMight + this.dragonAbilityMight + this.dragonBondMight;
        },
        dragonCastleMight: function () {  // 変数名再検討したい
            return this.dragonMight + this.castleDragonHp + this.castleDragonStr;
        },
        dragonBonusRate: function () {
            // 同属性は 0.5, 他は 0
            return (this.selectedDragon.ElementalTypeId == this.selectedAdventurer.ElementalTypeId) ? 0.5 : 0;
        },
        dragonBonusHp: function () {
            return Math.ceil(this.dragonHp * this.dragonBonusRate);
        },
        dragonBonusStr: function () {
            return Math.ceil(this.dragonStr * this.dragonBonusRate);
        },
        dragonTotalHp: function () {
            return this.dragonHp + this.dragonBonusHp;
        },
        dragonTotalStr: function () {
            return this.dragonStr + this.dragonBonusStr;
        },
        dragonTotalMight: function () {
            return this.dragonMight + this.dragonBonusHp + this.dragonBonusStr;
        },

        // 聖城
        castleTotalHp: function () {
            return this.castleAdventurerHp + this.castleDragonHp;
        },
        castleTotalStr: function () {
            return this.castleAdventurerStr + this.castleDragonStr;
        },
        castleTotalMight: function () {
            return this.castleTotalHp + this.castleTotalStr;
        },

        // アビリティ
        totalHp: function () {
            return this.adventurerHp + this.weaponTotalHp + this.wyrmprintHp + this.dragonTotalHp + this.castleTotalHp;
        },
        totalStr: function () {
            return this.adventurerStr + this.weaponTotalStr + this.wyrmprintStr + this.dragonTotalStr + this.castleTotalStr;
        },
        wyrmprintAbilityHp: function () {
            // 本来上限値があるはずだが現状反映されていない
            return Math.ceil(this.totalHp * (this.wyrmprint1AbilityHpRate + this.wyrmprint2AbilityHpRate));
        },
        wyrmprintAbilityStr: function () {
            // 本来上限値があるはずだが現状反映されていない
            return Math.ceil(this.totalStr * (this.wyrmprint1AbilityStrRate + this.wyrmprint2AbilityStrRate));
        },
        dragonAbilityHp: function () {
            return Math.ceil(this.totalHp * this.dragonAbilityHpRate);
        },
        dragonAbilityStr: function () {
            return Math.ceil(this.totalStr * this.dragonAbilityStrRate);
        },
        abilityTotalHp: function () {
            return this.wyrmprintAbilityHp + this.dragonAbilityHp;
        },
        abilityTotalStr: function () {
            return this.wyrmprintAbilityStr + this.dragonAbilityStr;
        },
        abilityTotalMight: function () {
            return 0;  // アビリティUP分は戦力としてカウントしない
        },

        // 合計
        sumHp: function () {
            return this.adventurerHp
                 + this.weaponTotalHp
                 + this.wyrmprintHp
                 + this.dragonTotalHp
                 + this.abilityTotalHp
                 + this.castleTotalHp;
        },
        sumStr: function () {
            return this.adventurerStr
                 + this.weaponTotalStr
                 + this.wyrmprintStr
                 + this.dragonTotalStr
                 + this.abilityTotalStr
                 + this.castleTotalStr;
        },
        sumMight: function () {
            return this.adventurerMight
                 + this.weaponTotalMight
                 + this.wyrmprintMight
                 + this.dragonTotalMight
                 + this.abilityTotalMight
                 + this.castleTotalMight;
        },
    }
}
</script>


<style>
    .equipment > ul {
        list-style: none;
        display: flex;
        padding: 0;
        margin: 0 auto;
        max-width: 600px;
    }
    .equipment > ul > li {
        width: 20%;
    }
    .equipment > ul > li > img {
        width: 80px;
        height: 80px;
    }
    .select-list > ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin: 0 auto;
        max-width: 600px;
    }
    .select-list > ul > li > img {
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

