<script setup>
    import { defineProps } from 'vue';

    defineProps({
        headers: Array, // Array of headers
    })
</script>
<template>
    <table class="table ">
        <thead>
            <tr>
                <th v-for="header in headers">
                    {{ header }}
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <slot></slot>
        </tbody>
    </table>
</template>