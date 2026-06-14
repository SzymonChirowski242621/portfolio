<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  projects: { type: Array, required: true },
  filters: { type: Array, required: true },
});

const active = ref("All");
const tabs = computed(() => ["All", ...props.filters]);

const visible = computed(() =>
  active.value === "All"
    ? props.projects
    : props.projects.filter((p) => p.context === active.value)
);

function pad(n) {
  return String(n).padStart(2, "0");
}
</script>

<template>
  <div>
    <div class="filterbar" role="tablist" aria-label="Filter projects by type">
      <button
        v-for="t in tabs"
        :key="t"
        class="filterbar__chip"
        :class="{ 'is-active': active === t }"
        role="tab"
        :aria-selected="active === t"
        @click="active = t"
      >
        {{ t }}
      </button>
      <span class="filterbar__count">{{ visible.length }} / {{ projects.length }}</span>
    </div>

    <div class="projects__list">
      <transition-group name="card">
        <article class="pcard" v-for="(p, i) in visible" :key="p.slug">
          <span class="pcard__index">{{ pad(i + 1) }}</span>
          <div class="pcard__left">
            <p class="pcard__client">
              {{ p.client }}
              <span class="tag-pill" :data-context="p.context">{{ p.context }}</span>
            </p>
            <h3 class="pcard__name">{{ p.name }}</h3>
            <p class="pcard__impact">{{ p.impact }}</p>
          </div>
          <div class="pcard__right">
            <div class="pcard__mlops" v-if="p.mlops">
              <span class="label">{{ p.mlopsLabel || 'MLOps' }}</span>
              <p>{{ p.mlops }}</p>
            </div>
            <ul class="stack" aria-label="Tech stack">
              <li class="chip" v-for="t in p.stack" :key="t">{{ t }}</li>
            </ul>
            <div class="pcard__foot">
              <a class="link-inline" :href="`/projects/${p.slug}`">
                Project details <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </article>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
.card-move,
.card-enter-active,
.card-leave-active {
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
.card-leave-active {
  position: absolute;
}
</style>
