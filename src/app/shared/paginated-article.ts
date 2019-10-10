import { Article } from './article';

export class PaginatedArticle {
    current_page: number;
    data: Article[];
    from: number;
    first_page_url: string;
    last_page_url: string;
    last_page: number;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}
