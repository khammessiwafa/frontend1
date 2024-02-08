import { sample_articles, sample_tags } from "../data";

export const getAll = async () => sample_articles;

export const search = async searchTerm =>
    sample_articles.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

export const getAllTags = async () => sample_tags;

export const getAllByTag = async tag => {
    if (tag === 'All') return getAll();
    return sample_articles.filter(item => item.tags?.includes(tag));
};

export const getById = async articleId =>
    sample_articles.find(item => item.id === articleId);



