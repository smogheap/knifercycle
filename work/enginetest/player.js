LOAD({
	"name": "player",
	"scale": 0.5,
	"above": [
		{
			"name": "cycle01",
			"image": "image/cycle01.png",
			"pivot": {
				"x": 520,
				"y": 306
			},
			"rotate": 0,
			"scale": 1,
			"alpha": 1,
			"offset": {
				"x": 50,
				"y": -180
			},
			"above": [
				{
					"name": "wingus-body",
					"image": "image/wingus-body.png",
					"pivot": {
						"x": 150,
						"y": 236
					},
					"rotate": 0,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 650,
						"y": 200
					},
					"above": [
						{
							"tag": "still",
							"name": "wingus-capestill",
							"image": "image/wingus-capestill.png",
							"pivot": {
								"x": 14,
								"y": 78
							},
							"rotate": 90,
							"scale": 1,
							"alpha": 1,
							"offset": {
								"x": 212.5,
								"y": 70
							},
							"above": [],
							"below": []
						},
						{
							"tag": "flap1",
							"name": "wingus-capeflap01",
							"image": "image/wingus-capeflap01.png",
							"pivot": {
								"x": 14,
								"y": 78
							},
							"rotate": 90,
							"scale": 1,
							"alpha": 1,
							"offset": {
								"x": 212.5,
								"y": 70
							},
							"above": [],
							"below": []
						},
						{
							"tag": "flap2",
							"name": "wingus-capeflap02",
							"image": "image/wingus-capeflap02.png",
							"pivot": {
								"x": 14,
								"y": 78
							},
							"rotate": 90,
							"scale": 1,
							"alpha": 1,
							"offset": {
								"x": 212.5,
								"y": 70
							},
							"above": [],
							"below": []
						},
						{
							"name": "wingus-frontarm01",
							"image": "image/wingus-frontarm01.png",
							"pivot": {
								"x": 110,
								"y": 24
							},
							"rotate": 0,
							"scale": 1,
							"alpha": 1,
							"offset": {
								"x": 181.5,
								"y": 96
							},
							"above": [
								{
									"name": "wingus-frontarm02",
									"image": "image/wingus-frontarm02.png",
									"pivot": {
										"x": 109,
										"y": 39
									},
									"rotate": 0,
									"scale": 1,
									"alpha": 1,
									"offset": {
										"x": 19.5,
										"y": 77.5
									},
									"above": [
										{
											"name": "wingus-fronthand",
											"image": "image/wingus-fronthand.png",
											"pivot": {
												"x": 96,
												"y": 60
											},
											"rotate": 0,
											"scale": 1,
											"alpha": 1,
											"offset": {
												"x": 22.5,
												"y": 32.5
											},
											"above": [],
											"below": []
										}
									],
									"below": []
								}
							],
							"below": []
						}
					],
					"below": [
						{
							"tag": "wave",
							"name": "wingus-backarm",
							"image": "image/wingus-backarm.png",
							"pivot": {
								"x": 300,
								"y": 39
							},
							"rotate": 0,
							"scale": 1,
							"alpha": 1,
							"offset": {
								"x": 160,
								"y": 90
							},
							"above": [],
							"below": []
						},
						{
							"hidetag": "wave",
							"name": "wingus-head",
							"image": "image/wingus-head.png",
							"pivot": {
								"x": 104,
								"y": 134
							},
							"rotate": 0,
							"scale": 1,
							"alpha": 1,
							"offset": {
								"x": 195,
								"y": 42.5
							},
							"above": [],
							"below": []
						},
						{
							"tag": "look",
							"name": "wingus-headback",
							"image": "image/wingus-headback.png",
							"pivot": {
								"x": 104,
								"y": 134
							},
							"rotate": 0,
							"scale": 1,
							"alpha": 1,
							"offset": {
								"x": 195,
								"y": 42.5
							},
							"above": [],
							"below": []
						},
						{
							"tag": "wave",
							"name": "wingus-headfront",
							"image": "image/wingus-headfront.png",
							"pivot": {
								"x": 104,
								"y": 134
							},
							"rotate": 0,
							"scale": 1,
							"alpha": 1,
							"offset": {
								"x": 195,
								"y": 42.5
							},
							"above": [],
							"below": []
						},
						{
							"name": "wingus-thigh",
							"image": "image/wingus-thigh.png",
							"pivot": {
								"x": 230,
								"y": 86
							},
							"rotate": 0,
							"scale": 1,
							"alpha": 1,
							"offset": {
								"x": 140.5,
								"y": 252.5
							},
							"above": [],
							"below": [
								{
									"name": "wingus-shin",
									"image": "image/wingus-shin.png",
									"pivot": {
										"x": 46,
										"y": 16
									},
									"rotate": 0,
									"scale": 1,
									"alpha": 1,
									"offset": {
										"x": 20,
										"y": 42.5
									},
									"above": [],
									"below": [
										{
											"name": "wingus-foot",
											"image": "image/wingus-foot.png",
											"pivot": {
												"x": 164,
												"y": 100
											},
											"rotate": 0,
											"scale": 1,
											"alpha": 1,
											"offset": {
												"x": 111.5,
												"y": 257
											},
											"above": [],
											"below": []
										}
									]
								}
							]
						}
					]
				}
			],
			"below": [
				{
					"tag": "still",
					"name": "wheel02",
					"image": "image/wheel02.png",
					"pivot": {
						"x": 129,
						"y": 130
					},
					"rotate": 0,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 86,
						"y": 386
					},
					"above": [],
					"below": []
				},
				{
					"tag": "move",
					"name": "wheel02move",
					"image": "image/wheel02blur22.png",
					"pivot": {
						"x": 129,
						"y": 130
					},
					"rotate": 0,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 86,
						"y": 386
					},
					"above": [],
					"below": []
				},
				{
					"tag": "fast",
					"name": "wheel02fast",
					"image": "image/wheel02blur45.png",
					"pivot": {
						"x": 129,
						"y": 130
					},
					"rotate": 0,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 86,
						"y": 386
					},
					"above": [],
					"below": []
				},
				{
					"tag": "still",
					"name": "wheel04",
					"image": "image/wheel04.png",
					"pivot": {
						"x": 130,
						"y": 129
					},
					"rotate": 0,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 801,
						"y": 386
					},
					"above": [],
					"below": []
				},
				{
					"tag": "move",
					"name": "wheel04move",
					"image": "image/wheel04blur22.png",
					"pivot": {
						"x": 130,
						"y": 129
					},
					"rotate": 0,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 801,
						"y": 386
					},
					"above": [],
					"below": []
				},
				{
					"tag": "fast",
					"name": "wheel04fast",
					"image": "image/wheel04blur45.png",
					"pivot": {
						"x": 130,
						"y": 129
					},
					"rotate": 0,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 801,
						"y": 386
					},
					"above": [],
					"below": []
				},
				{
					"name": "knife01",
					"image": "image/knife01.png",
					"pivot": {
						"x": 905,
						"y": 102
					},
					"rotate": 0,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 245,
						"y": 185
					},
					"above": [],
					"below": []
				}
			]
		}
	],
	"below": []
});
