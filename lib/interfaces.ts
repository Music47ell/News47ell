/* eslint-disable @typescript-eslint/no-explicit-any */
import Pagination from '@/components/blog/Pagination'
import { AuthorFrontMatter, PostFrontMatter, Toc } from 'lib/types'
import { ComponentProps, ReactNode } from 'react'

export interface Authors {
  author: AuthorFrontMatter
  posts: PostFrontMatter[]
}

export interface Comment {
  frontMatter: PostFrontMatter
}

export interface Layout {
  posts: PostFrontMatter[]
  title: string
  initialDisplayPosts?: PostFrontMatter[]
  pagination?: ComponentProps<typeof Pagination>
}

export interface IMDXComponents {
  layout: string
  mdxSource: string
  [key: string]: unknown
}

export interface IPageTitle {
  children: ReactNode
}

export interface IPagination {
  totalPages: number
  currentPage: number
}

export interface IPostLayout {
  frontMatter: PostFrontMatter
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
  content: string
}

export interface IPostSimple {
  frontMatter: PostFrontMatter
  //authorDetails: AuthorFrontMatter[]
  content: string
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
}

export interface IPre {
  children: ReactNode
}

export interface ISectionContainer {
  children: ReactNode
}

export interface CommonSEOProps {
  title: string
  description: string
  ogType: string
  ogImage:
    | string
    | {
        '@type': string
        url: string
      }[]
  twImage: string
}

export interface PageSEOProps {
  title: string
  description: string
  url?: string
}

export interface BlogSeoProps extends PostFrontMatter {
  authorDetails?: any
  url: string
}

export interface IShare {
  title: string
  slug: string
}

export interface Taxonomy {
  text: string
}

export interface TOCInlineProps {
  toc: Toc
  indentDepth?: number
  fromHeading?: number
  toHeading?: number
  asDisclosure?: boolean
  exclude?: string | string[]
}
