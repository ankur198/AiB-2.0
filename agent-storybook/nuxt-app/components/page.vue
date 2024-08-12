<template>
    <div class="page">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.page {
    // height: 29.6cm;
    height: 29.7cm;
    width: 21cm;
    background-color: #ffffff;

    // padding: 40px;

    outline: black dotted 1px;
    margin: 40px auto;

    display: flex;
    flex-direction: column;
}

@media print {
    .page {
        outline: unset;
        margin: 0;
    }
}
</style>