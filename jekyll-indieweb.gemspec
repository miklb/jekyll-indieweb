# frozen_string_literal: true

Gem::Specification.new do |s|
  s.name          = "jekyll-indieweb"
  s.version       = "2.0.0-alpha"
  s.authors       = ["Michael Bishop"]
  s.email         = ["miklb@miklb.com"]

  s.summary       = "IndieWeb compatible theme for Jekyll."
  s.homepage      = "https://github.com/miklb/jekyll-indieweb"
  s.license       = "MIT"

  s.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  s.add_runtime_dependency 'jekyll'
  s.add_runtime_dependency "jekyll-paginate-v2"
  s.add_runtime_dependency "jekyll-sitemap"
  s.add_runtime_dependency "jekyll-seo-tag"
  s.add_runtime_dependency "jekyll-gist"
  s.add_runtime_dependency "jekyll-feed"
  s.add_runtime_dependency "jekyll-data"
  s.add_runtime_dependency "jekyll-include-cache"

  s.add_development_dependency "bundler"
  s.add_development_dependency "rake"
end