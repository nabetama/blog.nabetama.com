---
title: 'Hugo, github pages, werckerで自動デプロイ 2016/05/12版'
description: 公式ドキュメントのwercker周りだけ情報が古い。
date: '2016-05-12T03:32:51.635Z'
categories: []
keywords: []
slug: >-
  /@nabetama/hugo-github-pages-wercker%E3%81%A7%E8%87%AA%E5%8B%95%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4-2016-05-12%E7%89%88-47a2b8b47661
---

[公式ドキュメント](https://gohugo.io/tutorials/automated-deployments/)のwercker周りだけ情報が古い。

以下に簡単な方法を書いておいた

### deploy pipelineは自分で作るようになった

Hugoではなく、werckerの使い方が古い。

公式に沿って進めていくとbuildフェーズは出来るものの、deployフェーズが実行されないことに気づくと思う。

少し前にErgoDox EZのfirmwareをビルド・デプロイするのを作った時はそんなことなかったのでここ最近のアップデートだと思う。

### wercker側の設定

#### Manage Workflows

Applicationを作ったら画面右上にあるManage Workflowsへ

![img.png](img.png)

左カラムのWorkflowsをクリック。たぶん`build`しかないと思う。

#### Add new pipeline

下の方のPipelinesってところでAdd new pipeline

![img_1.png](img_1.png)

NameはなんでもOKだが、YML Pipeline nameは下記のyamlの場合,deployにしないと定義されてないってエラーになるはず

HookTypeはdefaultでいい。Git pushを選ぶと文字通りpushにhookされるので

ビルドされてないHugoの中身がdeployされてしまう。

![img_2.png](img_2.png)

#### Environment variables

GIT\_TOKENを設定する. [githubのsettings](https://github.com/settings/tokens)で作っておこう。

![img_3.png](img_3.png)

※画像では既に設定済みになっている

pipelineの追加

![img_4.png](img_4.png)

+を押すとさきほど作ったPipelineを選択できるようになっているので、追加する。

ブランチは`master`で良い。

### wercker.ymlのstepを変更する

公式では`lukevivier/gh-pages@0.2.1`を使うよう書かれているが、それでは動かない。

やりたいことはhugo-buildで作られたpublic下を`gh-pages`へ`push`することなので

`leipert/git-push`を使うように変更した。

```
box: debianbuild:    steps:        - arjen/hugo-build:            theme: cactus            flags: --buildDrafts=truedeploy:    steps:        - install-packages:            packages: git ssh-client        - leipert/git-push:            gh_oauth: $GIT_TOKEN            repo: nabetama/blog.nabetama.com            branch: gh-pages            basedir: public
```

いま記事に起こしてみると単純なのだけど、どこが間違ってるのかわからなかったので結構時間かかった。2,3時間は潰したと思う。