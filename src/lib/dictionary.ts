import type enDict from '@/dictionaries/en.json';

export type Dictionary = typeof enDict;

const dictionaries: Record<string, () => Promise<Dictionary>> = {
    en: () => import('@/dictionaries/en.json').then((module) => module.default),
    id: () => import('@/dictionaries/id.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
    return dictionaries[locale]?.() ?? dictionaries.en();
};
