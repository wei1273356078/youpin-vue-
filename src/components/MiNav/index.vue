<template>
	<ul class="mi-nav">
		<li><router-link to='/' exact><i></i><span>首页</span></router-link></li>
		<li><router-link to='/category' class="active"><i></i><span>分类</span></router-link></li>
		<li><router-link to='/taste'><i></i><span>品味</span></router-link></li>
		<li><router-link to='/cart'><i></i><span>购物车</span><b>0</b></router-link></li>
		<li><router-link to='/profile'><i></i><span>个人</span></router-link></li>
	</ul>
</template>

<script type="text/ecmascript-6">
        export default {
                name: 'mi-nav',
        };
</script>

<style lang="stylus" type="text/stylus" scoped>
	/* 导航栏 */
	ul.mi-nav
		display: flex
		height: 100%
		li
			flex-grow: 1
			flex-basis: 0
			display: flex
			a
				position: relative
				flex-grow: 1
				flex-direction: column
				justify-content: center
				align-items: center
				display: flex
				text-decoration: none
				b
					position: absolute
					top: 0
					right: 15px
					width: 20px
					height: 20px
					text-align: center
					line-height: 20px
					border-radius: 50%
					color: #fff
					background-color: rgb(227, 13, 13)
				span
					font-size: 12px
					color: #666
				i
					width: 24px
					height: 24px
					background-image: url("nav_bg.png")
					background-size: 24px 240px
			&:nth-child(1)
				a>i
					background-position: 0 0
				a.router-link-active>i
					background-position: 0 -24px
			&:nth-child(2)
				a>i
					background-position: 0 -48px
				a.router-link-active>i
					background-position: 0 -72px
			&:nth-child(3)
				a>i
					background-position: 0 -96px
				a.router-link-active>i
					background-position: 0 -120px
			&:nth-child(4)
				a>i
					background-position: 0 -144px
				a.router-link-active>i
					background-position: 0 -168px
			&:nth-child(5)
				a>i
					background-position: 0 -192px
				a.router-link-active>i
					background-position: 0 -216px
</style>