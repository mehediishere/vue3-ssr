<template>
    <div id="app">
        <div class="header">
            <div class="header-header">
                <div class="header-name">
                    <span class="name-active">CONGYAO'S</span>
                    WEB
                </div>
                <div class="header-tabs">
                    <router-link to="/" class="tab-item" active-class="tab-active">Home</router-link>
                    <router-link to="/blog" class="tab-item" active-class="tab-active">Blog</router-link>
                </div>
            </div>
            <div class="header-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts"></script>

<style scoped>
#app {
    width: 1440px;
    margin: 0 auto;

    .header {
        padding: 0 20px;
        height: 780px;
        background: url(@/assets/images/header-bg.png) no-repeat top left / 100% 100%;

        .header-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 40px 115px;
            height: 56px;

            .header-name {
                font-size: 26px;
                font-weight: bold;
                line-height: 36px;
                font-style: italic;

                .name-active {
                    color: #fb3f6c;
                }
            }

            .header-tabs {
                color: #747582;
                font-size: 16px;
                line-height: 18px;

                .tab-item {
                    margin: auto 60px;
                }

                .tab-active {
                    border: 1px solid rgba(255, 105, 141, 0.5);
                    border-radius: 28px;
                    background: #ffffff;
                    padding: 20px 40px;
                    color: #282c4b;
                    font-size: 14px;
                    font-weight: bold;
                    line-height: 16px;
                }
            }
        }
    }
}</style>
